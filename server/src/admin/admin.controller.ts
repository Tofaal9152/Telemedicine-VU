import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AdminService } from './admin.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';

@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // patients
  @Get('patients')
  findAllPatients(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.adminService.findAllPatients(paginationDto, baseUrl);
  }

  @Get('patient/:id')
  findOnePatient(@Param('id') id: string) {
    return this.adminService.findOnePatient(id);
  }
  //  remove patient
  @Delete('patient/:id')
  removePatient(@Param('id') id: string) {
    return this.adminService.removePatient(id);
  }

  // Doctors
  @Post('doctor')
  createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.adminService.createDoctor(createDoctorDto);
  }
  @Get('doctors')
  findAllDoctors(
    @Query() paginationDto: PaginationDto,
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.adminService.findAllDoctors(paginationDto, baseUrl);
  }

  @Get('doctor/:id')
  findOneDoctor(@Param('id') id: string) {
    return this.adminService.findOneDoctor(id);
  }

  @Delete('doctor/:id')
  removeDoctor(@Param('id') id: string) {
    return this.adminService.removeDoctor(id);
  }

  // Approve doctor
  @Patch('doctor/:id/approval')
  approveDoctor(
    @Param('id') id: string,
    @Body('isApproved', ParseBoolPipe) isApproved: boolean,
  ) {
    return this.adminService.setApproval(id, isApproved);
  }
}
