import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      transports: ["websocket"], // Use only WebSocket
      reconnection: true,
    });
  }
  return socket;
};
