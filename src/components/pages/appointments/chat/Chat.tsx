"use client";

import { useChatMessages } from "@/hooks/useChatMessages";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import LoadingWrapper from "@/components/LoadingWrapper";
import { MessageSquare } from "lucide-react";

const Chat = ({ data, session }: { data: any; session: any }) => {
  const room = `room-${data.doctorId}-${data.patientId}`;
  const { messages, message, setMessage, handleSendMessage, PrevChat } =
    useChatMessages(room, session, data);

  return (
    <LoadingWrapper
      isLoading={PrevChat.isLoading}
      isError={PrevChat.isError}
      error={PrevChat.error}
    >
      {/* Glassy chat card */}
      <div
        className="
          h-[80vh] max-h-[80vh] w-full flex flex-col 
          rounded-3xl border border-white/25 
          bg-white/10 shadow-2xl 
          backdrop-blur-2xl 
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/20 flex items-center gap-3 text-white/90">
          <div className="h-9 w-9 rounded-2xl bg-white/20 flex items-center justify-center shadow">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide">
              Doctor–Patient Chat
            </h2>
            <p className="text-[11px] text-white/70">
              Secure real-time conversation
            </p>
          </div>
        </div>

        {/* Messages */}
        <MessageList messages={messages} userId={session.user.id} />

        {/* Input */}
        <MessageInput
          value={message}
          onChange={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </LoadingWrapper>
  );
};

export default Chat;
