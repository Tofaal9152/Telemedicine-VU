import { convertTimestamp } from "@/utils/convertTimestamp";

const MessageItem = ({ msg, isOutgoing }: { msg: any; isOutgoing: boolean }) => {
  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
          isOutgoing ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <div>{msg.content}</div>
        <div className="text-[10px] mt-1 opacity-60 text-right">
          {convertTimestamp(msg.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
