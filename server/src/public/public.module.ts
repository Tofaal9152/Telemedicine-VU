import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { DoctorService } from 'src/doctor/doctor.service';

@Module({
  controllers: [PublicController],
  providers: [PublicService, DoctorService],
})
export class PublicModule {}
