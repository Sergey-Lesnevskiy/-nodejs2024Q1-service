import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from 'src/interface/interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';
import { mockTracks } from 'src/db/db';

@Injectable()
export class TrackService {
  getTracks() {
    return mockTracks;
  }
  getTrackById(id: string): Track {
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  checkTrackById(id: string): Track {
    const track = mockTracks.find((track) => track.id === id);
    return track;
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    mockTracks.push(newTrack);
    return newTrack;
  }
  updateTrack(UpdateTrackDto: UpdateTrackDto, id: string) {
    const track = this.getTrackById(id);
    const trackIdx = this.getTrackIdx(id);
    if (!track) {
      throw new NotFoundException('Track not found!');
    }
    const updateTrack = {
      ...track,
      ...UpdateTrackDto,
    };
    mockTracks[trackIdx] = updateTrack;
    return updateTrack;
  }

  getTrackIdx(id: string): number {
    const trackIdx = mockTracks.findIndex((artist) => id === artist.id);
    if (trackIdx != -1) {
      return trackIdx;
    }
    throw new NotFoundException('Track not found');
  }

  deleteTrack(id: string) {
    const user = this.getTrackIdx(id);
    mockTracks.splice(user, 1);
  }

  deleteAlbum(id) {
    mockTracks.map((track) => {
      if (id === track.albumId) {
        track.albumId = null;
      }
    });
  }

  deleteArtist(id) {
    mockTracks.map((track) => {
      if (id === track.artistId) {
        track.artistId = null;
      }
    });
  }
}
