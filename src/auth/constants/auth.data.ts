import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class formData {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
