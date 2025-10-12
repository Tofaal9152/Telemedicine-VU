import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Public } from 'src/auth/decorators';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PublicService } from './public.service';
@Public()
@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('doctors/approved')
  getApprovedDoctors(
    @Query() paginationDto: PaginationDto,
    @Query('query') query: string,
    @Query('specialty') specialty: string,
    @Req() request: ExpressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.publicService.getApprovedDoctors(query, specialty, paginationDto, baseUrl);
  }

  @Get('all-doctors-specialty')
  getAllDoctorSpecialties() {
    return this.publicService.findAllDoctorSpecialties();
  }
}
