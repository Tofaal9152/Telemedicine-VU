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
    <div
      className="
        px-4 py-3 
        border-t border-white/20 
        bg-gradient-to-t from-black/10 via-black/5 to-transparent
        backdrop-blur-2xl
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex-1 flex items-center gap-2 
            rounded-full px-3 
            bg-white/15 border border-white/30 
            backdrop-blur-xl
          "
        >
          <Input
            type="text"
            placeholder="Type your message…"
            className="
              flex-1 bg-transparent border-0 shadow-none 
              text-white placeholder:text-white/50 
              focus-visible:ring-0 focus-visible:ring-offset-0
            "
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </div>

        <Button
          onClick={handleSendMessage}
          size="icon"
          className="
            h-11 w-11 rounded-full 
            bg-cyan-500/80 hover:bg-cyan-400/90 
            border border-white/40 
            shadow-lg backdrop-blur-xl
          "
        >
          <SendHorizonal className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
