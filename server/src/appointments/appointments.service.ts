/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { NotificationService } from 'src/notification/notification.service';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const SSLCommerzPayment = require('sslcommerz-lts');
@Injectable()
export class AppointmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly notificationService: NotificationService,
  ) {}
  async appointmentsService(
    appointmentDto: CreateAppointmentDto,
    userId: string,
  ) {
    console.log(userId, appointmentDto);
    // / Find the patient (based on the logged-in user's ID)
    const patient = await this.prisma.patient.findUnique({
      where: { userId: userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    // Find the doctor (based on the appointmentDto.doctorId)
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        userId: appointmentDto.doctorId,
      },
      include: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    // check if he buied this appointment before
    const existingAppointment = await this.prisma.appointment.findFirst({
      where: {
        patientId: patient.id,
        doctorId: doctor.id,
        status: 'PAID',
      },
    });

    if (existingAppointment) {
      throw new NotFoundException('You have already bought this appointment');
    }

    const store_id = process.env.STORE_ID!;
    const store_passwd = process.env.STORE_PASSWD!;
    const is_live = process.env.IS_LIVE === 'true';

    const tran_id = crypto.randomUUID();

    const data = {
      total_amount: doctor?.visitFee || 0,
      currency: 'BDT',
      tran_id: tran_id,
      success_url: `${process.env.BASE_URL}/appointments/payment/success/${tran_id}`,
      fail_url: `${process.env.BASE_URL}/appointments/payment/fail/${tran_id}`,
      cancel_url: `${process.env.BASE_URL}/appointments/payment/cancel/${tran_id}`,
      ipn_url: `${process.env.BASE_URL}/ipn`,
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
    console.log(store_id, store_passwd, is_live);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const apiResponse = await sslcz.init(data);
    console.log('SSLCommerz API response:', apiResponse);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const GatewayPageURL = apiResponse.GatewayPageURL;

    // Save to DB
    const finalAppointment = await this.prisma.appointment.create({
      data: {
        patientId: patient?.id,
        doctorId: doctor?.id,
        tranId: tran_id,
        status: 'PENDING',
      },
    });

    if (!finalAppointment) {
      throw new NotFoundException('Failed to create appointment');
    }

    return {
      success: true,
      message: 'Redirecting to payment gateway',
      payment_url: GatewayPageURL,
    };
  }

  async appointmentsSuccess(tranId: string) {
    const appointment = await this.prisma.appointment.update({
      where: {
        tranId: tranId,
      },
      data: {
        status: 'PAID',
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return {
      success: true,
      message: 'Appointment payment successful',
      redirectUrl: `https://telemedicine-olive.vercel.app/appointments/success/tranId=${tranId}`,
    };
  }

  async appointmentsFail(tranId: string) {
    const appointment = await this.prisma.appointment.update({
      where: {
        tranId: tranId,
      },
      data: {
        status: 'FAILED',
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return {
      success: false,
      message: 'Appointment payment failed',
      redirectUrl: `https://telemedicine-olive.vercel.app/appointments/fail/tranId=${tranId}`,
    };
  }
  async appointmentsCancel(tranId: string) {
    const appointment = await this.prisma.appointment.update({
      where: {
        tranId: tranId,
      },
      data: {
        status: 'CANCELED',
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return {
      success: false,
      message: 'Appointment payment canceled',
      redirectUrl: `https://telemedicine-olive.vercel.app/appointments/cancel/tranId=${tranId}`,
    };
  }
  // patient appointments
  async getAllPatientAppointments(
    paginationDto: PaginationDto,
    baseUrl: string,
    userId: string,
  ) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const patient = await this.prisma.patient.findUnique({
      where: { userId: userId },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          patientId: patient.id,
        },
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  age: true,
                  imageUrl: true,
                  gender: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.appointment.count({
        where: {
          patientId: patient.id,
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
  async getAllPatientPaidAppointments(
    paginationDto: PaginationDto,
    baseUrl: string,
    userId: string,
  ) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const patient = await this.prisma.patient.findUnique({
      where: { userId: userId },
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          patientId: patient.id,
          status: 'PAID',
        },
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  age: true,
                  gender: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.appointment.count({
        where: {
          patientId: patient.id,
          status: 'PAID',
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
  // doctor appointments
  async getAllDoctorAppointments(
    paginationDto: PaginationDto,
    baseUrl: string,
    userId: string,
  ) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;

    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: userId },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          doctorId: doctor.id,
        },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  age: true,
                  gender: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.appointment.count({
        where: {
          doctorId: doctor.id,
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
  async getAllDoctorPaidAppointments(
    paginationDto: PaginationDto,
    baseUrl: string,
    userId: string,
  ) {
    const page = paginationDto.page;
    const limit = paginationDto.limit;
    const skip = (page - 1) * limit;
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: userId },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        where: {
          doctorId: doctor.id,
          status: 'PAID',
        },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  age: true,
                  gender: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),

      this.prisma.appointment.count({
        where: {
          doctorId: doctor.id,
          status: 'PAID',
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
  // appointment details
  async getAppointmentDetails(appointmentId: string, userId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                imageUrl: true,
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
                name: true,
                email: true,
                imageUrl: true,
                age: true,
              },
            },
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }
}
