import { IsNotEmpty } from 'class-validator';

export class CreaTetaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
