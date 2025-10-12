import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type SocketStore = {
  socket: Socket | null;
  initSocket: () => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,

  initSocket: () => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!);
    set({ socket });
  },
}));
