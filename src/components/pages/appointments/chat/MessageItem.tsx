import { convertTimestamp } from "@/utils/convertTimestamp";

const MessageItem = ({
  msg,
  isOutgoing,
}: {
  msg: any;
  isOutgoing: boolean;
}) => {
  return (
    <div
      className={`flex w-full ${
        isOutgoing ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          relative max-w-xs px-4 py-2 text-sm 
          backdrop-blur-xl shadow-lg 
          border rounded-2xl 
          ${isOutgoing
            ? "bg-cyan-500/40 border-cyan-200/40 text-white"
            : "bg-white/15 border-white/30 text-white"
          }
        `}
      >
        {/* text */}
        <div className="whitespace-pre-line leading-relaxed">
          {msg.content}
        </div>

        {/* time */}
        <div
          className={`text-[10px] mt-1 opacity-70 ${
            isOutgoing ? "text-right" : "text-left"
          }`}
        >
          {convertTimestamp(msg.timestamp)}
        </div>

        {/* subtle glow */}
        {isOutgoing && (
          <div className="absolute -right-2 -bottom-2 h-3 w-3 rounded-full bg-cyan-400/60 blur-[3px]" />
        )}
      </div>
    </div>
  );
};

export default MessageItem;
