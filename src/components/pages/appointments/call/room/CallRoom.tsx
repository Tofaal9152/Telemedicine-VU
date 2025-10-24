"use client";

import { usePeerStore } from "@/context/Peer";
import { useSocket } from "@/hooks/useSocket";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CallControls from "./CallControls";
import VideoPlayer from "./VideoPlayer";

const CallRoom = ({ room }: { room: string }) => {
  const socket = useSocket();
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteEmail, setRemoteEmail] = useState<string | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const {
    createOffer,
    CreateAnswer,
    setRemoteDescription,
    sendStream,
    remoteStream,
    peer,
    handleEndCallResetAll,
  } = usePeerStore();

  // New User Joined
  const handleUserJoined = useCallback(
    async (data: { recipientEmail: string }) => {
      toast.success(`User ${data.recipientEmail} joined the call.`, {
        duration: 2000,
        position: "top-right",
      });
      const offer = await createOffer();
      setTimeout(() => {
        socket.emit("call-user", {
          offer,
          recipientEmail: data.recipientEmail,
        });
      }, 1000);
      setRemoteEmail(data.recipientEmail);
    },
    [createOffer, socket]
  );

  // Incoming Call
  const handleIncomingCall = useCallback(
    async (data: { senderEmail: string; offer: RTCSessionDescriptionInit }) => {
      const { senderEmail, offer } = data;
      const answer = await CreateAnswer(offer);
      socket.emit("call-accepted", {
        answer,
        senderEmail,
      });
      setRemoteEmail(senderEmail);
    },
    [CreateAnswer, socket]
  );

  // Call Accepted
  const handleCallAccepted = useCallback(
    async (data: { answer: RTCSessionDescriptionInit }) => {
      await setRemoteDescription(data.answer);
    },
    [setRemoteDescription]
  );

  // Get Media Stream
  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMyStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, []);

  // User Left
  // const handleUserLeftBroadcast = useCallback(
  //   (data: { message: string }) => {
  //     setRemoteEmail(null);
  //     setRemoteStream(null);
  //     toast.success(data.message, {
  //       duration: 2000,
  //       position: "top-right",
  //     });
  //   },
  //   [setRemoteStream]
  // );
  // user left message broadcast
  // Socket Events
  const handleEndCall = useCallback(
    (data: { message: string }) => {
      if (myStream) {
        myStream.getTracks().forEach((track) => track.stop());
        setMyStream(null);
      }

      handleEndCallResetAll();
      setRemoteEmail(null);
      setMyStream(null);
      toast.error(data.message, {
        duration: 2000,
        position: "top-right",
      });
      window.location.href = "/";
    },
    [handleEndCallResetAll, myStream, setMyStream]
  );
  useEffect(() => {
    if (!socket) return;
    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    // socket.on("user-left", handleUserLeftBroadcast);
    socket.on("end-call", handleEndCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      // socket.off("user-left", handleUserLeftBroadcast);
      socket.off("end-call", handleEndCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleEndCall,
    // handleUserLeftBroadcast,
  ]);

  // Get Media on Mount
  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  // Negotiation Needed
  const handleNegotiationNeeded = useCallback(async () => {
    if (!peer) return;
    const localOffer = await peer.createOffer();
    await peer.setLocalDescription(localOffer);
    socket.emit("call-user", {
      offer: localOffer,
      recipientEmail: remoteEmail,
    });
  }, [peer, remoteEmail, socket]);

  useEffect(() => {
    if (!peer) return;
    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer, handleNegotiationNeeded]);

  useEffect(() => {
    if (myStream) sendStream(myStream);
  }, [myStream, sendStream]);
  // Toggle Mic
  const toggleAudio = () => {
    if (!myStream) return;
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  // Toggle Camera
  const toggleVideo = () => {
    if (!myStream) return;
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsCamOn(track.enabled);
    });
  };
  // stop call
  const endCall = () => {
    socket.emit("end-call", { room });
  };

  return (
    <div className="relative w-full h-[80vh] rounded-md bg-black text-white overflow-hidden">
      <VideoPlayer stream={remoteStream} isRemote={true} />
      {myStream && <VideoPlayer stream={myStream} isRemote={false} />}

      <CallControls
        isMicOn={isMicOn}
        isCamOn={isCamOn}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        endCall={endCall}
      />
    </div>
  );
};

export default CallRoom;
