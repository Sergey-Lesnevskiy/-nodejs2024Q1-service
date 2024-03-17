import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/interface/interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const tracks: Track[] = [];

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}
  async getTracks() {
    const tracks = await this.trackRepository.find();
    return tracks.map((user) => user.toResponse());
  }
  async getTrackById(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async checkTrackById(trackId: string) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });
    return track;
  }
  async createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    tracks.push(newTrack);
    const createdTrack = this.trackRepository.create(newTrack);
    return (await this.trackRepository.save(createdTrack)).toResponse();
  }
  async updateTrack(UpdateTrackDto: UpdateTrackDto, id: string) {
    const track = await this.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found!');
    }
    const updateTrack = {
      ...track,
      ...UpdateTrackDto,
    };

    await this.trackRepository.save(updateTrack);
    return updateTrack;
  }

  getTrackIdx(id: string): number {
    const trackIdx = tracks.findIndex((artist) => id === artist.id);
    if (trackIdx != -1) {
      return trackIdx;
    }
    throw new NotFoundException('Track not found');
  }

  async deleteTrack(id: string) {
    const track = await this.getTrackById(id);
    if (track) {
      await this.trackRepository.delete(id);
    }
  }

  async deleteAlbum(id) {
    const tracks = await this.getTracks();
    await Promise.all(
      tracks.map(async (track) => {
        if (id === track.albumId) {
          track.albumId = null;
          await this.trackRepository.save(track);
        }
      }),
    );
  }

  async deleteArtist(id) {
    const tracks = await this.getTracks();
    await Promise.all(
      tracks.map(async (track) => {
        if (id === track.artistId) {
          track.artistId = null;
          await this.trackRepository.save(track);
        }
      }),
    );
  }
}
