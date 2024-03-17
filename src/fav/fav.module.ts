import { Module } from '@nestjs/common';
import { FavsController } from './fav.controller';
import { FavsService } from './fav.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
