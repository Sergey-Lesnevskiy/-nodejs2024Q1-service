import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsNotEmpty()
  @IsOptional()
  artistId: string | null;

  @IsUUID(4)
  @IsNotEmpty()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
