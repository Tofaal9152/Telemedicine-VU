import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsString()
  @IsNotEmpty()
  appointmentId: string;
  @IsString()
  @IsNotEmpty()
  doctorId: string;
  @IsString()
  @IsNotEmpty()
  patientId: string;
  @IsString()
  @IsNotEmpty()
  symptoms: string;
  @IsString()
  @IsNotEmpty()
  diagnosis: string;
  @IsNotEmpty()
  @IsOptional()
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  @IsString()
  @IsOptional()
  notes?: string;
}
