"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";

interface PeerContextType {
  peer: RTCPeerConnection | null;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  CreateAnswer: (
    offer: RTCSessionDescriptionInit
  ) => Promise<RTCSessionDescriptionInit>;
  setRemoteDescription: (answer: RTCSessionDescriptionInit) => Promise<void>;
  addIceCandidate: (candidate: RTCIceCandidateInit) => Promise<void>;
  remoteStream: MediaStream | null;
  sendStream: (stream: MediaStream) => void;
  handleEndCallResetAll: () => void;
}

const peerContext = createContext<PeerContextType | null>(null);

const createPeerConnection = () => {
  if (typeof window === "undefined" || !window.RTCPeerConnection) {
    return null;
  }

  return new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });
};

export const usePeerStore = () => {
  const context = useContext(peerContext);
  if (!context) {
    throw new Error("usePeerStore must be used within a PeerProvider");
  }
  return context;
};

export const PeerProvider = ({ children }: { children: React.ReactNode }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<RTCPeerConnection | null>(() =>
    createPeerConnection()
  );

  useEffect(() => {
    if (!peer) setPeer(createPeerConnection());
  }, [peer]);

  useEffect(() => {
    return () => {
      peer?.close();
    };
  }, [peer]);

  const createOffer = useCallback(async () => {
    if (!peer) throw new Error("Peer connection not ready yet");
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }, [peer]);

  const CreateAnswer = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      if (!peer) throw new Error("Peer connection not ready yet");
      try {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
      } catch (error) {
        console.error("Error answering call:", error);
        throw error;
      }
    },
    [peer]
  );

  const setRemoteDescription = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      if (!peer) throw new Error("Peer connection not ready yet");

      const currentState = peer.signalingState;
      if (
        currentState !== "have-local-offer" &&
        currentState !== "have-remote-offer"
      ) {
        console.warn("Skipped setRemoteDescription, state:", currentState);
        return;
      }

      try {
        await peer.setRemoteDescription(answer);
      } catch (error) {
        console.error("Error setting remote description:", error);
        throw error;
      }
    },
    [peer]
  );

  const addIceCandidate = useCallback(
    async (candidate: RTCIceCandidateInit) => {
      if (!peer) throw new Error("Peer connection not ready yet");

      try {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
        throw error;
      }
    },
    [peer]
  );

  const sendStream = useCallback(
    (stream: MediaStream) => {
      try {
        if (!peer) throw new Error("Peer connection not ready yet");

        const tracks = stream.getTracks();
        for (const track of tracks) {
          const existingSender = peer
            .getSenders()
            .find((sender) => sender.track?.kind === track.kind);

          if (existingSender) {
            existingSender.replaceTrack(track);
          } else {
            peer.addTrack(track, stream);
          }
        }
      } catch (error: any) {
        toast.error("Error sending stream: " + error.message);
      }
    },
    [peer]
  );

  const handleTrackEvent = useCallback(
    (event: RTCTrackEvent) => {
      const remoteStream = event.streams[0];
      setRemoteStream(remoteStream);
    },
    [setRemoteStream]
  );

  useEffect(() => {
    if (!peer) return;
    peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [peer, handleTrackEvent]);

  const handleEndCallResetAll = useCallback(() => {
    if (peer) {
      peer.close();
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
      setRemoteStream(null);
    }

    setRemoteStream(null);
    setPeer(createPeerConnection());
  }, [peer, remoteStream]);

  const contextValue = useMemo(
    () => ({
      peer,
      createOffer,
      CreateAnswer,
      setRemoteDescription,
      addIceCandidate,
      sendStream,
      remoteStream,
      handleEndCallResetAll,
    }),
    [
      peer,
      createOffer,
      CreateAnswer,
      setRemoteDescription,
      addIceCandidate,
      sendStream,
      remoteStream,
      handleEndCallResetAll,
    ]
  );

  return (
    <peerContext.Provider value={contextValue}>{children}</peerContext.Provider>
  );
};
