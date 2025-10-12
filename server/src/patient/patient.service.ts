import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { sanitizeUser } from 'src/common/utils/sanitize-user.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const { password, ...user } = createPatientDto;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        age: user.age,
        gender: user.gender,
        imageUrl: user.imageUrl,
        role: 'PATIENT',
        patient: {
          create: {},
        },
      },
      include: {
        patient: true,
      },
    });
  }

  async getProfile(id: string) {
    return await this.findOne(id);
  }

  async updateProfile(id: string, updatePatientDto: UpdatePatientDto) {
    await this.findOne(id);

    const updatedPatient = await this.prisma.user.update({
      where: { id },
      data: {
        ...updatePatientDto,
      },
      include: {
        patient: true,
      },
    });

    return sanitizeUser(updatedPatient);
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
        where: { role: 'PATIENT' },
        select: {
          id: true,
          email: true,
          name: true,
          age: true,
          imageUrl: true,
          role: true,
          gender: true,
          patient: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where: { role: 'PATIENT' } }),
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
    const patient = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        patient: true,
      },
    });
    if (!patient || patient.role !== 'PATIENT') {
      throw new NotFoundException(`Patient with id ${id} not found`);
    }
    return sanitizeUser(patient);
  }

  async remove(id: string) {
    await this.findOne(id);

    const deleteUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!deleteUser) {
      throw new NotFoundException(`Patient with id ${id} could not be removed`);
    }
    return { message: `Patient with id ${id} removed successfully` };
  }
}
