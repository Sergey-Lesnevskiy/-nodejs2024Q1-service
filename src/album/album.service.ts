import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from 'src/interface/interface';
import { TrackService } from 'src/track/track.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { mockAlbums } from 'src/db/db';

// const albums: Album[] = [];

@Injectable()
export class AlbumService {
  constructor(private readonly trackService: TrackService) {}
  getAlbums() {
    return mockAlbums;
  }
  getAlbumById(id: string): Album {
    const album = mockAlbums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  checkAlbumById(id: string): Album {
    const album = mockAlbums.find((album) => album.id === id);
    return album;
  }
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    mockAlbums.push(newAlbum);
    return newAlbum;
  }
  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = this.getAlbumById(id);
    const albumIdx = this.getAlbumIdx(id);
    if (!album) {
      throw new NotFoundException('Album not found!');
    }
    const updateAlbum = {
      ...album,
      ...updateAlbumDto,
    };
    mockAlbums[albumIdx] = updateAlbum;
    return updateAlbum;
  }

  getAlbumIdx(id: string): number {
    const albumIdx = mockAlbums.findIndex((album) => id === album.id);
    if (albumIdx != -1) {
      return albumIdx;
    }
    throw new NotFoundException('Album not found');
  }

  deleteAlbum(id: string) {
    const album = this.getAlbumIdx(id);
    mockAlbums.splice(album, 1);
    this.trackService.deleteAlbum(id);
  }

  deleteArtist(id) {
    mockAlbums.map((album) => {
      if (id === album.artistId) {
        album.artistId = null;
      }
    });
  }
}
