import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class bookmarkFormData {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  link: string;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
