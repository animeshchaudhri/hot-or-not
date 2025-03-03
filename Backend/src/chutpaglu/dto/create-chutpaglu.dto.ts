import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateChutpagluDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  _id: string
  
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  rank: number;

  @IsString()
  @IsNotEmpty()
  imageURL: string;
}
