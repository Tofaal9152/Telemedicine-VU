import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(createChatDto: CreateChatDto) {
    return await this.prisma.message.create({
      data: {
        content: createChatDto.content,
        doctorId: createChatDto.doctorId,
        patientId: createChatDto.patientId,
        userId: createChatDto.userId,
      },
    });
  }

  async getMessages(doctorId: string, patientId: string) {
    return this.prisma.message.findMany({
      where: {
        doctorId,
        patientId,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });
  }
}
