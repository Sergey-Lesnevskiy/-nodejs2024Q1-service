import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsEntity } from './entities/favorite.entity';

const db = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,
  ) {}

  async getAll() {
    const favoritesRepsonse = {
      albums: [],
      artists: [],
      tracks: [],
    };
    await Promise.all(
      db.albums.map(async (album) => {
        const findAlbum = await this.albumService.checkAlbumById(album);
        if (findAlbum) favoritesRepsonse.albums.push(findAlbum);
      }),
    );
    await Promise.all(
      db.tracks.map(async (track) => {
        const findTrack = await this.trackService.checkTrackById(track);
        if (findTrack) favoritesRepsonse.tracks.push(findTrack);
      }),
    );
    await Promise.all(
      db.artists.map(async (artist) => {
        const findArtist = await this.artistService.checkArtistById(artist);
        if (findArtist) favoritesRepsonse.artists.push(findArtist);
      }),
    );
    return await this.favsRepository.save(favoritesRepsonse);
  }

  async addTrackToFavs(id: string) {
    const track = await this.trackService.checkTrackById(id);
    if (track) {
      db.tracks.push(id);
      return await this.getAll();
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async deleteTrackFromFavs(id: string) {
    const track = await this.trackService.checkTrackById(id);
    if (track) {
      db.tracks = db.tracks.filter((track) => {
        return track !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  async addAlbumToFavs(id: string) {
    const album = await this.albumService.checkAlbumById(id);
    if (album) {
      db.albums.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }
  async deleteAlbumFromFavs(id: string) {
    const album = await this.albumService.checkAlbumById(id);
    if (album) {
      db.albums = db.albums.filter((album) => {
        return album !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  async addArtistToFavs(id: string) {
    const artist = await this.artistService.checkArtistById(id);
    if (artist) {
      db.artists.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async deleteArtistFromFavs(id: string) {
    const artist = await this.artistService.checkArtistById(id);
    if (artist) {
      db.artists = db.artists.filter((artist) => {
        return artist !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }

  deleteAlbum(id) {
    const albumIdx = db.albums.findIndex((album) => id === album.id);
    if (albumIdx !== -1) {
      return albumIdx;
    }
  }
}
