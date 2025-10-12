"use client";
import { useChatMessages } from "@/hooks/useChatMessages";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import LoadingWrapper from "@/components/LoadingWrapper";

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
      <div className="h-[80vh] rounded-xl overflow-hidden flex flex-col border border-gray-200 shadow-sm">
        <MessageList messages={messages} userId={session.user.id} />
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
