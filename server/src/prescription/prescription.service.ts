import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/common/services/pagination.service';
import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
@Injectable()
export class PrescriptionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto, userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!doctor || createPrescriptionDto.doctorId !== doctor.id) {
      throw new NotFoundException('Doctor not found or not authorized');
    }
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: createPrescriptionDto.appointmentId },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    const isPrescriptionExists = await this.prisma.prescription.findUnique({
      where: {
        appointmentId: createPrescriptionDto.appointmentId,
      },
    });
    if (isPrescriptionExists) {
      throw new NotFoundException(
        'Prescription already exists for this appointment',
      );
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: createPrescriptionDto.patientId },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    const newPrescription = await this.prisma.prescription.create({
      data: {
        appointmentId: createPrescriptionDto.appointmentId,
        doctorId: createPrescriptionDto.doctorId,
        patientId: createPrescriptionDto.patientId,
        symptoms: createPrescriptionDto.symptoms,
        diagnosis: createPrescriptionDto.diagnosis,
        medications: createPrescriptionDto.medications,
        notes: createPrescriptionDto.notes,
      },
    });
    // send notifications to patient after creating prescription
    await this.notificationService.create(
      {
        title: 'New Prescription Created',
        message: `A new prescription has been created By Dr. ${doctor.user.name} for your appointment.`,
        priority: 'HIGH',
      },
      patient.userId,
    );
    return newPrescription;
  }

  async PrescriptionUnderAppointment(appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    const prescription = await this.prisma.prescription.findUnique({
      where: { appointmentId: appointmentId },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                age: true,
                gender: true,
              },
            },
          },
        },
        patient: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                age: true,
                gender: true,
              },
            },
          },
        },
      },
    });

    if (!prescription) {
      return {
        message: 'No prescription found for this appointment',
        result: null,
      };
    }

    return {
      message: 'Prescription found',
      result: prescription,
    };
  }

  // async findOne(id: string) {
  //   return this.prisma.prescription.findUnique({
  //     where: { id },
  //   });
  // }

  async update(
    id: string,
    updatePrescriptionDto: UpdatePrescriptionDto,
    userId: string,
  ) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: userId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    // check  he can delete the prescription
    const CheckprescriptionUpdt = await this.prisma.prescription.findFirst({
      where: { doctorId: doctor.id },
      include: {
        patient: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                age: true,
                gender: true,
              },
            },
          },
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                age: true,
              },
            },
          },
        },
      },
    });

    if (!CheckprescriptionUpdt) {
      throw new NotFoundException('You cannot Edit this prescription');
    }

    const updatedPrescription = this.prisma.prescription.update({
      where: { id },
      data: updatePrescriptionDto,
    });

    const patient = await this.prisma.patient.findUnique({
      where: { id: updatePrescriptionDto.patientId },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    await this.notificationService.create(
      {
        title: 'Prescription Updated',
        message: `Your prescription has been updated by Dr. ${doctor.user.name}.`,
        priority: 'HIGH',
      },
      patient.userId,
    );
    return updatedPrescription;
  }

  async remove(id: string, userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: userId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    // check  he can delete the prescription
    const CheckprescriptionDlt = await this.prisma.prescription.findFirst({
      where: { doctorId: doctor.id },
    });

    if (!CheckprescriptionDlt) {
      throw new NotFoundException('You cannot delete this prescription');
    }
    const prescription = await this.prisma.prescription.delete({
      where: { id },
    });
    return {
      message: 'Prescription deleted successfully',
      prescription,
    };
  }

  //send morning, afternoon and evening notifications for medicine if prescription exists automatically
}
