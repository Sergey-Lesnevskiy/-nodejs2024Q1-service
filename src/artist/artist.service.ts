import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from 'src/interface/interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

const artists: Artist[] = [];

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}
  async getArtists() {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => artist.toResponse());
  }
  async getArtistById(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    if (!artist) {
      throw new NotFoundException('User not found');
    }
    return artist;
  }

  async checkArtistById(artistId: string) {
    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });
    return artist;
  }
  async createArtist(createArtistDto: CreateArtistDto) {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    artists.push(newArtist);
    const createdArtist = this.artistRepository.create(newArtist);
    return (await this.artistRepository.save(createdArtist)).toResponse();
  }
  async updateArtist(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = await this.getArtistById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    const updateArtist = {
      ...artist,
      ...updateArtistDto,
    };
    await this.artistRepository.save(updateArtist);
    return updateArtist;
  }

  getArtistIdx(id: string): number {
    const artistIdx = artists.findIndex((artist) => id === artist.id);
    if (artistIdx != -1) {
      return artistIdx;
    }
    throw new NotFoundException('Artist not found');
  }

  async deleteArtist(id: string) {
    const artist = await this.getArtistById(id);
    if (artist) {
      await this.artistRepository.delete(id);
    }
    await this.albumService.deleteArtist(id);
    await this.trackService.deleteArtist(id);
  }
}
