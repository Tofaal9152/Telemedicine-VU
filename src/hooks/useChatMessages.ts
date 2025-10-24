import { useCallback, useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { useSocket } from "./useSocket";

export const useChatMessages = (room: string, session: any, data: any) => {
    const socket = useSocket();

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const PrevChat = useFetchData<any>(
    `/chats?doctorId=${data.doctorId}&patientId=${data.patientId}`,
    ["chat", data.doctorId, data.patientId]
  );

  useEffect(() => {
    if (PrevChat.data) setMessages(PrevChat.data);
  }, [PrevChat.data]);

  useEffect(() => {
    socket.emit("joinRoom", { room });
  }, [socket, room]);

  useEffect(() => {
    const handleIncoming = (msg: any) => setMessages((prev) => [...prev, msg]);

    socket.on("onMessage", handleIncoming);
    return () => {
      socket.off("onMessage", handleIncoming);
    };
  }, [socket]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    const payload = {
      content: message,
      doctorId: data.doctorId,
      patientId: data.patientId,
      userId: session.user.id,
    };

    socket.emit("createMessage", payload);
    setMessage("");
  }, [message, data, session, socket]);

  return {
    messages,
    message,
    setMessage,
    handleSendMessage,
    PrevChat,
  };
};
