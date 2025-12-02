import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

const MessageList = ({
  messages,
  userId,
}: {
  messages: any[];
  userId: string;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } catch {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="
        flex-1 min-h-0 overflow-y-auto 
        no-scrollba
        
        px-4 py-3
        bg-gradient-to-b from-white/5 via-white/0 to-white/5
        space-y-3
      "
    >
      {messages.map((msg, idx) => (
        <MessageItem
          key={msg.id || idx}
          msg={msg}
          isOutgoing={msg.userId === userId}
        />
      ))}
      <div />
    </div>
  );
};

export default MessageList;
