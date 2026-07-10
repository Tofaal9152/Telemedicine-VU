"use client";

import { usePeerStore } from "@/context/Peer";
import { useSocket } from "@/hooks/useSocket";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CallControls from "./CallControls";
import VideoPlayer from "./VideoPlayer";

type UserJoinedPayload = {
  recipientEmail: string;
  socketId: string;
};

type IncomingCallPayload = {
  senderEmail: string;
  senderSocketId: string;
  offer: RTCSessionDescriptionInit;
};

type CallAcceptedPayload = {
  senderSocketId?: string;
  answer: RTCSessionDescriptionInit;
};

type IceCandidatePayload = {
  senderSocketId?: string;
  candidate: RTCIceCandidateInit;
};

const stopStream = (stream: MediaStream | null) => {
  stream?.getTracks().forEach((track) => track.stop());
};

const CallRoom = ({ room, session }: { room: string; session: any }) => {
  const socket = useSocket();
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const remoteSocketIdRef = useRef<string | null>(null);
  const pendingIceCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const hasJoinedRoomRef = useRef(false);
  const mediaErrorShownRef = useRef(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const {
    createOffer,
    CreateAnswer,
    setRemoteDescription,
    addIceCandidate,
    sendStream,
    remoteStream,
    peer,
    handleEndCallResetAll,
  } = usePeerStore();

  const currentUserEmail = session?.user?.email;
  const currentUserName = session?.user?.name ?? "Anonymous";
  const currentUserRole = session?.user?.role ?? "guest";

  const updateRemotePeer = useCallback((socketId: string | null) => {
    remoteSocketIdRef.current = socketId;
  }, []);

  const flushIceCandidates = useCallback(async () => {
    if (!peer?.remoteDescription) return;

    const candidates = [...pendingIceCandidatesRef.current];
    pendingIceCandidatesRef.current = [];

    for (const candidate of candidates) {
      await addIceCandidate(candidate);
    }
  }, [addIceCandidate, peer]);

  const showMediaError = useCallback((message: string) => {
    if (mediaErrorShownRef.current) return;
    mediaErrorShownRef.current = true;
    toast.error(message);
  }, []);

  const handleUserJoined = useCallback(
    async (data: UserJoinedPayload) => {
      if (!data.socketId || data.socketId === socket.id) return;

      updateRemotePeer(data.socketId);
      toast.success(`User ${data.recipientEmail} joined the call.`, {
        duration: 2000,
        position: "top-right",
      });

      const offer = await createOffer();
      socket.emit("call-user", {
        offer,
        recipientSocketId: data.socketId,
      });
    },
    [createOffer, socket, updateRemotePeer]
  );

  const handleIncomingCall = useCallback(
    async (data: IncomingCallPayload) => {
      const { senderEmail, senderSocketId, offer } = data;
      updateRemotePeer(senderSocketId);

      const answer = await CreateAnswer(offer);
      await flushIceCandidates();

      socket.emit("call-accepted", {
        answer,
        recipientSocketId: senderSocketId,
      });

      toast.success(`Connected with ${senderEmail}`, {
        duration: 2000,
        position: "top-right",
      });
    },
    [CreateAnswer, flushIceCandidates, socket, updateRemotePeer]
  );

  const handleCallAccepted = useCallback(
    async (data: CallAcceptedPayload) => {
      if (data.senderSocketId) updateRemotePeer(data.senderSocketId);
      await setRemoteDescription(data.answer);
      await flushIceCandidates();
    },
    [flushIceCandidates, setRemoteDescription, updateRemotePeer]
  );

  const handleIceCandidate = useCallback(
    async (data: IceCandidatePayload) => {
      if (!data.candidate) return;
      if (data.senderSocketId) updateRemotePeer(data.senderSocketId);

      if (!peer?.remoteDescription) {
        pendingIceCandidatesRef.current.push(data.candidate);
        return;
      }

      await addIceCandidate(data.candidate);
    },
    [addIceCandidate, peer, updateRemotePeer]
  );

  const handleEndCall = useCallback(
    (data: { message: string }) => {
      stopStream(myStream);
      setMyStream(null);
      handleEndCallResetAll();
      updateRemotePeer(null);
      pendingIceCandidatesRef.current = [];
      toast.error(data.message, {
        duration: 2000,
        position: "top-right",
      });
      window.location.href = "/";
    },
    [handleEndCallResetAll, myStream, updateRemotePeer]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("user-joined", handleUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("end-call", handleEndCall);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("end-call", handleEndCall);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleIceCandidate,
    handleEndCall,
  ]);

  useEffect(() => {
    if (!socket || !currentUserEmail || hasJoinedRoomRef.current) return;

    hasJoinedRoomRef.current = true;
    socket.emit("join-room", {
      room,
      name: currentUserName,
      role: currentUserRole,
      email: currentUserEmail,
    });
  }, [socket, room, currentUserEmail, currentUserName, currentUserRole]);

  useEffect(() => {
    let cancelled = false;
    let acquiredStream: MediaStream | null = null;

    const requestMedia = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        showMediaError(
          "Camera and microphone require HTTPS on mobile. Open the app with HTTPS or test from localhost."
        );
        return;
      }

      try {
        acquiredStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (error) {
        const errorName = error instanceof DOMException ? error.name : "";
        console.error("Error accessing media devices:", error);

        if (errorName === "NotReadableError") {
          showMediaError(
            "Camera or microphone is already in use. Close other call tabs/apps, then rejoin."
          );
        } else {
          showMediaError(
            "Camera or microphone permission is required for video call."
          );
        }
        return;
      }

      if (cancelled) {
        stopStream(acquiredStream);
        return;
      }

      setIsMicOn(acquiredStream.getAudioTracks().some((track) => track.enabled));
      setIsCamOn(acquiredStream.getVideoTracks().some((track) => track.enabled));
      setMyStream(acquiredStream);
    };

    requestMedia();

    return () => {
      cancelled = true;
      stopStream(acquiredStream);
    };
  }, [showMediaError]);

  const handleNegotiationNeeded = useCallback(async () => {
    const recipientSocketId = remoteSocketIdRef.current;
    if (!peer || !recipientSocketId || peer.signalingState !== "stable") return;

    const localOffer = await peer.createOffer();
    await peer.setLocalDescription(localOffer);
    socket.emit("call-user", {
      offer: localOffer,
      recipientSocketId,
    });
  }, [peer, socket]);

  useEffect(() => {
    if (!peer) return;
    peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiationNeeded);
    };
  }, [peer, handleNegotiationNeeded]);

  useEffect(() => {
    if (!peer) return;

    const handleLocalIceCandidate = (event: RTCPeerConnectionIceEvent) => {
      const recipientSocketId = remoteSocketIdRef.current;
      if (!event.candidate || !recipientSocketId) return;

      socket.emit("ice-candidate", {
        recipientSocketId,
        candidate: event.candidate.toJSON(),
      });
    };

    peer.addEventListener("icecandidate", handleLocalIceCandidate);

    return () => {
      peer.removeEventListener("icecandidate", handleLocalIceCandidate);
    };
  }, [peer, socket]);

  useEffect(() => {
    if (myStream) sendStream(myStream);
  }, [myStream, sendStream]);

  const toggleAudio = () => {
    if (!myStream) return;
    myStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMicOn(track.enabled);
    });
  };

  const toggleVideo = () => {
    if (!myStream) return;
    myStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsCamOn(track.enabled);
    });
  };

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
