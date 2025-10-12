import { ConflictException, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  // patients
  findAllPatients(paginationDto: PaginationDto, baseUrl: string) {
    return this.patientService.findAll(paginationDto, baseUrl);
  }

  findOnePatient(id: string) {
    return this.patientService.findOne(id);
  }
  removePatient(id: string) {
    return this.patientService.remove(id);
  }

  // Doctors
  async createDoctor(createDoctorDto: CreateDoctorDto) {
    if (createDoctorDto.password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters!');
    }
    const user = await this.doctorService.findByEmail(createDoctorDto.email);

    if (user) {
      throw new ConflictException('User already exists!');
    }
    return this.doctorService.adminCreateDoctor(createDoctorDto);
  }
  findAllDoctors(paginationDto: PaginationDto, baseUrl: string) {
    return this.doctorService.findAll(paginationDto, baseUrl);
  }

  findOneDoctor(id: string) {
    return this.doctorService.findOne(id);
  }

  removeDoctor(id: string) {
    return this.doctorService.remove(id);
  }

  setApproval(id: string, isApproved: boolean) {
    return this.doctorService.setApproval(id, isApproved);
  }
}
