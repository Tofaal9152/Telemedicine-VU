import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const MessageInput = ({
  value,
  onChange,
  handleSendMessage,
}: {
  value: string;
  onChange: (val: string) => void;
  handleSendMessage: () => void;
}) => {
  return (
    <div className="p-4 border-t flex items-center gap-2 bg-white">
      <Input
        type="text"
        placeholder="Type a message..."
        className="flex-1 rounded-xl border border-gray-300
        bg-gray-100 text-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button
        onClick={handleSendMessage}
        size="icon"
        className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600"
      >
        <SendHorizonal className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default MessageInput;
