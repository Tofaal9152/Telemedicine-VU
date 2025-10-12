import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { sanitizeUser } from 'src/common/utils/sanitize-user.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { password, ...user } = createDoctorDto;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        age: user.age,
        gender: user.gender,
        imageUrl: user.imageUrl,
        role: 'DOCTOR',
        doctor: {
          create: {
            visitFee: user.visitFee,
            bio: user.bio,
            specialty: user.specialty,
            experience: user.experience,
            registrationNumber: user.registrationNumber,
          },
        },
      },
      include: {
        doctor: true,
      },
    });
  }

  async adminCreateDoctor(createDoctorDto: CreateDoctorDto) {
    const { password, ...user } = createDoctorDto;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        age: user.age,
        gender: user.gender,
        role: 'DOCTOR',
        imageUrl: user.imageUrl,
        doctor: {
          create: {
            visitFee: user.visitFee,
            bio: user.bio,
            specialty: user.specialty,
            experience: user.experience,
            registrationNumber: user.registrationNumber,
            isApproved: true,
          },
        },
      },
      include: {
        doctor: true,
      },
    });
  }

  async getProfile(id: string) {
    return await this.findOne(id);
  }

  async updateProfile(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.findOne(id);

    // if(updateDoctorDto.imageUrl) {
    //   return await this.prisma.user.update()
    // }
    const updatedDoctor = await this.prisma.user.update({
      where: { id: id },
      data: {
        ...updateDoctorDto,
        doctor: {
          update: {
            bio: updateDoctorDto.bio,
            experience: updateDoctorDto.experience,
          },
        },
      },
      include: {
        doctor: true,
      },
    });

    return sanitizeUser(updatedDoctor);
  }

  async findAll(paginationDto: PaginationDto, baseUrl: string) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: { role: 'DOCTOR' },
        select: {
          id: true,
          email: true,
          name: true,
          age: true,
          gender: true,
          imageUrl: true,
          role: true,
          doctor: {
            select: {
              bio: true,
              experience: true,
              specialty: true,
              isApproved: true,
              visitFee: true,
              registrationNumber: true,
            },
          },
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where: { role: 'DOCTOR' } }),
    ]);

    const meta = this.paginationService.buildPaginationMeta(
      baseUrl,
      page,
      limit,
      total,
    );

    return { ...meta, results: data };
  }

  async findOne(id: string) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        doctor: true,
      },
    });
    if (!doctor || doctor.role !== 'DOCTOR') {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }
    return sanitizeUser(doctor);
  }

  async findByEmail(email: string) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        doctor: true,
      },
    });

    return doctor;
  }

  async remove(id: string) {
    await this.findOne(id);

    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!deleteUser) {
      throw new NotFoundException(`Doctor with id ${id} could not be removed`);
    }
    return { message: `Doctor with id ${id} removed successfully` };
  }
  // Approve or disapprove a doctor by
  async setApproval(id: string, isApproved: boolean) {
    await this.findOne(id);
    const updatedDoctor = await this.prisma.user.update({
      where: { id },
      data: {
        doctor: {
          update: { isApproved },
        },
      },
      include: { doctor: true },
    });

    return sanitizeUser(updatedDoctor);
  }
  // Get all approved doctors
  async findApprovedDoctors(
    query: string,
    specialty: string,
    page: number,
    skip: number,
    limit: number,
    baseUrl: string,
  ) {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          role: 'DOCTOR',
          doctor: {
            isApproved: true,
            ...(specialty && {
              specialty: { contains: specialty },
            }),
          },
          ...(query && {
            OR: [{ name: { contains: query } }, { email: { contains: query } }],
          }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          age: true,
          gender: true,
          role: true,
          imageUrl: true,
          doctor: {
            select: {
              bio: true,
              experience: true,
              specialty: true,
              isApproved: true,
            },
          },
          createdAt: true,
        },
      }),

      this.prisma.user.count({
        where: {
          role: 'DOCTOR',
          doctor: { isApproved: true },
          ...(query && {
            OR: [
              { name: { contains: query } },
              {
                doctor: { specialty: { contains: query } },
              },
            ],
          }),
        },
      }),
    ]);

    const meta = this.paginationService.buildPaginationMeta(
      baseUrl,
      page,
      limit,
      total,
    );

    return { ...meta, results: data };
  }

  async findAllDoctorSpecialties() {
    const specialties = await this.prisma.doctor.findMany({
      where: {
        isApproved: true,
      },
      select: {
        id: true,
        specialty: true,
      },
    });

    const uniqueSpecialties = new Set(specialties.map((doc) => doc.specialty));
    return Array.from(uniqueSpecialties);
  }
}
