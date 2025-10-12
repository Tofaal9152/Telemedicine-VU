import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, userId }: { messages: any[]; userId: string }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      {messages.map((msg, idx) => (
        <MessageItem
          key={msg.id || idx}
          msg={msg}
          isOutgoing={msg.userId === userId}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
