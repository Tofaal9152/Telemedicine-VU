import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Role } from 'generated/prisma';
import { sanitizeUser } from 'src/common/utils/sanitize-user.util';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { PatientService } from 'src/patient/patient.service';
import { CreateGooleUserDto } from 'src/user/dto/create-google.dto';
import { UserService } from 'src/user/user.service';
import refreshConfig from './config/refresh.config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}
  // Sign up method
  async signup(dto: CreateUserDto) {
    if (dto.password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters!');
    }
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newUser = await this.userService.create(dto);
    if (!newUser) {
      throw new ConflictException('User creation failed!');
    }
    return {
      message: 'User created successfully!',
      user: sanitizeUser(newUser),
    };
  }
  // Sign up method for doctor
  async signupDoctor(createDoctorDto: CreateDoctorDto) {
    if (createDoctorDto.password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters!');
    }
    const user = await this.userService.findByEmail(createDoctorDto.email);

    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newDoctor = await this.doctorService.create(createDoctorDto);

    if (!newDoctor) {
      throw new ConflictException('Doctor creation failed!');
    }
    return {
      message: 'Signup successful',
      user: sanitizeUser(newDoctor),
    };
  }
  // Sign up method for patient
  async signupPatient(createPatientDto: CreatePatientDto) {
    if (createPatientDto.password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters!');
    }
    const user = await this.userService.findByEmail(createPatientDto.email);

    if (user) {
      throw new ConflictException('User already exists!');
    }
    const newPatient = await this.patientService.create(createPatientDto);

    if (!newPatient) {
      throw new ConflictException('Patient creation failed!');
    }
    return {
      message: 'Signup successful',
      user: sanitizeUser(newPatient),
    };
  }

  async signin(userId: string, role: Role, name?: string, email?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await hash(refreshToken);
    const user = await this.userService.updateRefreshToken(
      userId,
      hashedRefreshToken,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // Sign in method
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  // validate method for JWT strategy
  async validateJwtUser(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return {
      id: user.id,
      role: user.role,
    };
  }
  // Refresh token method

  async refreshToken(userId: string, name?: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRefreshToken = await hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        name,
      },
    };
  }
  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    if (!user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const isRefreshTokenValid = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return {
      id: user.id,
    };
  }
  // Geneerate Token -signin & refreshToken
  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  // Validate Google user
  async validateGoogleUser(googleUser: CreateGooleUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.createGoogleLogin(googleUser);
  }
  // Sign out method
  async signOut(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    await this.userService.updateRefreshToken(userId, null);
    return {
      message: 'User signed out successfully!',
    };
  }
  // Update password method
  async updatePassword(dto: UpdatePasswordDto, userId: string) {
    if (dto.newPassword === dto.oldPassword) {
      throw new ConflictException(
        'New password cannot be the same as old password',
      );
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    const isOldPasswordValid = await this.validateUser(
      user.email,
      dto.oldPassword,
    );

    if (dto.newPassword !== dto.confirmPassword) {
      throw new ConflictException(
        'New password and confirm password do not match',
      );
    }
    await this.userService.updatePassword(userId, dto.newPassword);
    return {
      message: 'Password updated successfully!',
    };
  }
}
