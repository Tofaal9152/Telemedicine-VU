import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    // console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.room);
  }

  @SubscribeMessage('createMessage')
  async handleNewMessage(@MessageBody() createChatDto: CreateChatDto) {
    console.log(createChatDto);

    const room = `room-${createChatDto?.doctorId}-${createChatDto?.patientId}`;

    const savedMessage = await this.chatService.saveMessage(createChatDto);
    this.server.to(room).emit('onMessage', savedMessage);
  }
}
