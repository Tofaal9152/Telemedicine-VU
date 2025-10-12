import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Role } from 'generated/prisma';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { GoogleAuthGuard, LocalAuthGuard, RefreshAuthGuard } from './guards';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Roles } from './decorators/roles.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('admin/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }
  @Public()
  @Post('doctor/signup')
  signupDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.signupDoctor(createDoctorDto);
  }
  @Public()
  @Post('patient/signup')
  signupPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.signupPatient(createPatientDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('signin')
  signin(
    @Request()
    req: {
      user: { id: string; name: string; email: string; role: Role };
    },
  ) {
    return this.authService.signin(
      req.user.id,
      req.user.role,
      req.user.name,
      req.user.email,
    );
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refresh(@Request() req: { user: { id: string } }) {
    return this.authService.refreshToken(req.user.id);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('callback/google')
  async googleCallback(
    @Request()
    req: { user: { id: string; name: string; email: string; role: Role } },
    @Res() resopnse: Response,
  ) {
    const res = await this.authService.signin(
      req.user.id,
      req.user.role,
      req.user.name,
      req.user.email,
    );
    resopnse.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${res.user.id}&email=${res.user.email}&role=${res.user.role}&accessToken=${res.accessToken}&refreshToken=${res.refreshToken}`,
    );
  }

  @Post('signout')
  signOut(@Req() req: { user: { id: string } }) {
    return this.authService.signOut(req.user.id);
  }
  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Patch('change-password')
  updateProfile(
    @Req() req: { user: { id: string } },
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.authService.updatePassword(dto, req.user.id);
  }
}
