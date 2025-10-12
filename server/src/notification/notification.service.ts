import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.notification.create({
      data: {
        ...createNotificationDto,
        userId: user.id,
        isRead: false,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      take: 100,
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: string) {
    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async findAllForPatients() {
    return this.prisma.notification.findMany({
      where: { user: { role: 'PATIENT' } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Cron('0 8 * * *') // 8 AM
  @Cron('0 13 * * *') // 1 PM
  @Cron('0 20 * * *') // 8 PM
  async sendMedicineReminders() {
    const patients = await this.prisma.user.findMany({
      where: { role: 'PATIENT' },
    });

    for (const patient of patients) {
      await this.prisma.notification.create({
        data: {
          userId: patient.id,
          title: 'Medication Reminder',
          message: 'Please take your prescribed medication now.',
          priority: 'HIGH',
          isRead: false,
        },
      });
    }
  }
}
