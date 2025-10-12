import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DoctorService } from './doctor.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
@Roles('DOCTOR')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('profile')
  getPatientInfo(@Request() req: { user: { id: string } }) {
    return this.doctorService.getProfile(req.user.id);
  }

  @Patch('profile')
  updatePatientInfo(
    @Request() req: { user: { id: string } },
    @Body() updatePatientDto: UpdateDoctorDto,
  ) {
    return this.doctorService.updateProfile(req.user.id, updatePatientDto);
  }
}
