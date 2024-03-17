import { Module, forwardRef } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => TrackModule),
  ],
})
export class AlbumModule {}
