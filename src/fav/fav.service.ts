import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavoritesResponse } from 'src/interface/interface';
import { mockFavorites } from 'src/db/db';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  getAll(): FavoritesResponse {
    const favoritesResponse: FavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };
    mockFavorites.albums.forEach((album) => {
      const findAlbum = this.albumService.checkAlbumById(album);
      if (findAlbum) favoritesResponse.albums.push(findAlbum);
    });
    mockFavorites.tracks.forEach((track) => {
      const findTrack = this.trackService.checkTrackById(track);
      if (findTrack) favoritesResponse.tracks.push(findTrack);
    });
    mockFavorites.artists.forEach((artist) => {
      const findArtist = this.artistService.checkArtistById(artist);
      if (findArtist) favoritesResponse.artists.push(findArtist);
    });
    return favoritesResponse;
  }

  addTrackToFavs(id: string) {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      mockFavorites.tracks.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }

  deleteTrackFromFavs(id: string) {
    const track = this.trackService.checkTrackById(id);
    if (track) {
      mockFavorites.tracks = mockFavorites.tracks.filter((track) => {
        return track !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addAlbumToFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      mockFavorites.albums.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteAlbumFromFavs(id: string) {
    const album = this.albumService.checkAlbumById(id);
    if (album) {
      mockFavorites.albums = mockFavorites.albums.filter((album) => {
        return album !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }
  addArtistToFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      mockFavorites.artists.push(id);
    } else {
      throw new UnprocessableEntityException();
    }
  }
  deleteArtistFromFavs(id: string) {
    const artist = this.artistService.checkArtistById(id);
    if (artist) {
      mockFavorites.artists = mockFavorites.artists.filter((artist) => {
        return artist !== id;
      });
    } else {
      throw new UnprocessableEntityException();
    }
  }

  // deleteAlbum(id: string) {
  //   const albumIdx = mockFavorites.albums.findIndex((album) => id === album.id);
  //   if (albumIdx !== -1) {
  //     return albumIdx;
  //   }
  // }
}
