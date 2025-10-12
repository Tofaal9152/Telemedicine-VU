import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Gender } from 'generated/prisma';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsEnum(Gender as object, { message: 'Gender must be either male or female' })
  @IsNotEmpty()
  gender: Gender;


  @IsString()
  @IsOptional()
  imageUrl: string;
}
