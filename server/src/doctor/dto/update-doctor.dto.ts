import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto extends OmitType(PartialType(CreateDoctorDto), [
  'password',
  'email',
  'specialty',
] as const) {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  
}
