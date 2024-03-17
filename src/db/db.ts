import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorite } from 'src/fav/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const mockUsers: User[] = [];
export const mockTracks: Track[] = [];
export const mockArtists: Artist[] = [];
export const mockAlbums: Album[] = [];
export const mockFavorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};
