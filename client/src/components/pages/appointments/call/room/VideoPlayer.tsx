import { Loader } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream: MediaStream | null;
  isRemote: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ stream, isRemote }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      className={`absolute ${
        isRemote
          ? "inset-0"
          : "top-4 right-4 w-48 h-32 rounded-lg border border-white/20"
      } overflow-hidden shadow-lg`}
    >
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={!isRemote}
          className="w-full h-full object-cover"
        />
      ) : (
        isRemote && (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Loader className="animate-spin mr-2" /> Waiting for user to join...
          </div>
        )
      )}
    </div>
  );
};

export default VideoPlayer;
