import {
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateTrackDto {
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
