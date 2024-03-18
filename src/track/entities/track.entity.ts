import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  toResponse() {
    const { id, name, duration, artistId, albumId } = this;
    return { id, name, duration, artistId, albumId };
  }
}
