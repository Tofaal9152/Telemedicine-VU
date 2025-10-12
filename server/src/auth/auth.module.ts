import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import googleOauthConfig from './config/googleOauth.config';
import jwtConfig from './config/jwt.config';
import refreshConfig from './config/refresh.config';
import {
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy,
  RefreshStrategy,
} from './strategies';
import { PatientService } from 'src/patient/patient.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UserService,
    DoctorService,
    PatientService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
