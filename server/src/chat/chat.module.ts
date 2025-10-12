import { Module } from '@nestjs/common';
import { CallGateway } from './call.gateway';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, CallGateway, ChatService],
})
export class ChatModule {}
