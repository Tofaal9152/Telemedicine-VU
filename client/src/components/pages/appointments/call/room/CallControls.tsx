import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface CallControlsProps {
  isMicOn: boolean;
  isCamOn: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  endCall: () => void; 
}

const CallControls: React.FC<CallControlsProps> = ({
  isMicOn,
  isCamOn,
  toggleAudio,
  toggleVideo,
  endCall,
}) => {
  const handleEndCall = () => {
    const confirmed = window.confirm(
      "Ending the call will disconnect both sides. Are you sure you want to end the call?"
    );
    if (confirmed) {
      endCall();
    }
  };
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6 bg-black/40 px-4 py-2 rounded-full shadow-lg">
      <Button onClick={toggleAudio} variant="secondary" size="icon">
        {isMicOn ? <Mic size={20} /> : <MicOff size={20} color="red" />}
      </Button>
      <Button onClick={toggleVideo} variant="secondary" size="icon">
        {isCamOn ? <Video size={20} /> : <VideoOff size={20} color="red" />}
      </Button>
      <Button onClick={handleEndCall} variant="destructive" size="icon">
        <PhoneOff size={20} />
      </Button>
    </div>
  );
};

export default CallControls;
