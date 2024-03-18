import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interface/interface';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { mockUsers } from 'src/db/db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }
  async getUserById(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
      ...createUserDto,
    };
    const createdUser = this.userRepository.create(newUser);
    return (await this.userRepository.save(createdUser)).toResponse();
  }
  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<any> {
    const user = await this.getUserById(id);
    const userIdx = this.getUserIdx(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    const newUserNoPassword = Object.assign({}, user);
    delete newUserNoPassword.password;
    const result = {
      ...newUserNoPassword,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: +Date.now(),
    };
    result.createdAt = +result.createdAt;
    await this.userRepository.save(result);
    return await this.getUserById(result.id).then((res) => {
      delete res.password;
      res.createdAt = +res.createdAt;
      res.updatedAt = +res.updatedAt;
      return res;
    });
  }

  getUserIdx(id: string): number {
    const userIdx = mockUsers.findIndex((user) => id === user.id);
    if (userIdx != -1) {
      return userIdx;
    }
    throw new NotFoundException('User not found');
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (user) {
      await this.userRepository.delete(id);
    }
  }
}
