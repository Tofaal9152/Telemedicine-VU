import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends OmitType(PartialType(CreatePatientDto), [
  'password',
  'email',
] as const) {}
