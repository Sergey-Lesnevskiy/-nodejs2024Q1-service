import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  toResponse() {
    const { id, name, grammy } = this;
    return { id, name, grammy };
  }
}
