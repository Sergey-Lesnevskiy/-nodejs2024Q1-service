import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export class Favorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

@Entity('favs')
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  tracks: string[];
}
