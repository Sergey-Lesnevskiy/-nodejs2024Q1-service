import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/interface/interface';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

const albums: Album[] = [];

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}
  async getAlbums() {
    const albums = await this.albumRepository.find();
    return albums.map((album) => album.toResponse());
  }
  async getAlbumById(artistId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: artistId },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async checkAlbumById(artistId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: artistId },
    });
    return album;
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    albums.push(newAlbum);
    const createdAlbum = this.albumRepository.create(newAlbum);
    return (await this.albumRepository.save(createdAlbum)).toResponse();
  }
  async updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = await this.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found!');
    }
    const updateAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    await this.albumRepository.save(updateAlbum);
    return updateAlbum;
  }

  getAlbumIdx(id: string): number {
    const albumIdx = albums.findIndex((album) => id === album.id);
    if (albumIdx != -1) {
      return albumIdx;
    }
    throw new NotFoundException('Album not found');
  }

  async deleteAlbum(id: string) {
    const album = await this.getAlbumById(id);
    if (album) {
      await this.albumRepository.delete(id);
    }
    await this.trackService.deleteAlbum(id);
  }

  async deleteArtist(id) {
    const albums = await this.getAlbums();
    albums.map(async (album) => {
      if (id === album.artistId) {
        album.artistId = null;
        await this.albumRepository.save(album);
      }
    });
  }
}
