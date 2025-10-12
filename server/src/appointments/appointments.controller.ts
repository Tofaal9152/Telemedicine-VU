import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { Request as expressRequest, Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Public } from 'src/auth/decorators';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Create an appointment
  @Roles('PATIENT')
  @Post('payment')
  createAppointment(
    @Body() appointmentDto: CreateAppointmentDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.appointmentsService.appointmentsService(
      appointmentDto,
      req.user.id,
    );
  }
  // successfully created appointment
  @Public()
  @Post('payment/success/:tran_id')
  async AppointmentsSuccess(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsSuccess(tranId);
    return res.redirect(result.redirectUrl);
  }

  @Public()
  @Post('payment/fail/:tran_id')
  async AppointmentsFail(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsFail(tranId);
    return res.redirect(result.redirectUrl);
  }

  @Public()
  @Post('payment/cancel/:tran_id')
  async AppointmentsCancel(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsCancel(tranId);
    return res.redirect(result.redirectUrl);
  }

  // get all appointments of a patient
  @Roles('PATIENT')
  @Get('patient/all')
  getAllPatientAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllPatientAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  @Roles('PATIENT')
  @Get('patient/paid')
  getAllPatientPaidAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;

    return this.appointmentsService.getAllPatientPaidAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  // get all appointments of a doctor
  @Roles('DOCTOR')
  @Get('doctor/all')
  getAllDoctorAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllDoctorAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  @Roles('DOCTOR')
  @Get('doctor/paid')
  getAllDoctorPaidAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllDoctorPaidAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }

  // appointment details
  @Roles('PATIENT', 'DOCTOR')
  @Get(':id')
  async getAppointmentDetails(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.appointmentsService.getAppointmentDetails(id, req.user.id);
  }
}
