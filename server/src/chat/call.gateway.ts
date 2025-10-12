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
type JoinRoomDataTypes = {
  room: string;
  email: string;
};
type CallOfferData = {
  recipientEmail: string;
  offer: unknown;
  room: string;
};
// socketMapping
const emailToSocketMap = new Map<string, string>();
const socketToEmailMap = new Map<string, string>();
// CallGateway handles
@WebSocketGateway({ cors: true })
export class CallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() data: JoinRoomDataTypes,
    @ConnectedSocket() client: Socket,
  ) {
    const { room, email } = data;
    emailToSocketMap.set(email, client.id);
    socketToEmailMap.set(client.id, email);
    await client.join(room);
    client.emit('joined-room', {
      message: `You (${email}) have joined the room: ${room}`,
    });
    client.broadcast.to(room).emit('user-joined', {
      recipientEmail: email,
    });
    console.log(`User with email ${email} joined room: ${room}`, client.id);
  }

  @SubscribeMessage('call-user')
  handleCallOffer(
    @MessageBody() data: CallOfferData,
    @ConnectedSocket() client: Socket,
  ) {
    const { offer, recipientEmail } = data;
    const senderEmail = socketToEmailMap.get(client.id);
    const recipentSocketId = emailToSocketMap.get(recipientEmail);

    if (!recipentSocketId) {
      console.error(`No socket found for recipientEmail: ${recipientEmail}`);
      return;
    }
    console.log(`Call to ${recipientEmail} user from ${senderEmail} user`);
    return this.server.to(recipentSocketId).emit('incoming-call', {
      offer,
      senderEmail: senderEmail,
    });
  }
  @SubscribeMessage('call-accepted')
  handleCallAccepted(
    @MessageBody()
    data: { senderEmail: string; answer: RTCSessionDescriptionInit },
    @ConnectedSocket() client: Socket,
  ) {
    const { senderEmail, answer } = data;
    console.log(senderEmail);
    const socketId = emailToSocketMap.get(senderEmail);

    if (!socketId) {
      console.error(`No socket found for email: ${senderEmail}`);
      return;
    }
    this.server.to(socketId).emit('call-accepted', {
      answer,
    });
  }
  @SubscribeMessage('end-call')
  handleEndCall(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { room } = data;
    // client.broadcast.to(room).emit('user-left', {
    //   email: socketToEmailMap.get(client.id),
    //   message: `User with has left the call`,
    // });
    // client.emit('end-call', {
    //   message: `You have left the call`,
    // });
    // all users in the room

    this.server.to(room).emit('end-call', {
      message: `User with email ${socketToEmailMap.get(client.id)} has left the call`,
    });

    console.log(`User ended call in room: ${room}`, client.id);
  }
}
