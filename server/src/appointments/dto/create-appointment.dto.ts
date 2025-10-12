import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  doctorId: string;

}
