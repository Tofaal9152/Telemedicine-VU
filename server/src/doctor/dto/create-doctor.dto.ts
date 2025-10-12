import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'generated/prisma';

export class CreateDoctorDto {
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

  @IsNumber()
  @IsNotEmpty()
  visitFee: number;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
