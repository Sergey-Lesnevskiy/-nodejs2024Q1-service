import { Module, forwardRef } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
  ],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
