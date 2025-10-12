import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGooleUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
