import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('chats')
@Roles('DOCTOR', 'PATIENT')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async getMessages(
    @Query('doctorId') doctorId: string,
    @Query('patientId') patientId: string,
  ) {
    return this.chatService.getMessages(doctorId, patientId);
  }
}
