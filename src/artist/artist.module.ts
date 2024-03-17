import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [ArtistController],
  imports: [AlbumModule, TrackModule],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
