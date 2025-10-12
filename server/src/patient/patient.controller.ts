import { Body, Controller, Get, Patch, Req, Request } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('patient')
@Roles('PATIENT')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('profile')
  getPatientInfo(@Request() req: { user: { id: string } }) {
    return this.patientService.getProfile(req.user.id);
  }

  @Patch('profile')
  updatePatientInfo(
    @Request() req: { user: { id: string } },
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.updateProfile(req.user.id, updatePatientDto);
  }
}
