import { create } from "zustand";

type PeerStore = {
  peer: RTCPeerConnection | null;
  remoteStream: MediaStream | null;
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null;
  createPeer: () => void;
  resetPeer: () => void;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>;
  setRemoteAnswer: (answer: RTCSessionDescriptionInit) => void;
  sendStream: (stream: MediaStream) => void;
};

export const usePeerStore = create<PeerStore>((set, get) => ({
  peer: null,
  remoteStream: null,
  offer: null,
  answer: null,

  createPeer: () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:global.stun.twilio.com:3478" },
      ],
    });

    peer.ontrack = (event) => {
      const remoteStream = event.streams[0];
      set({ remoteStream });
    };

    set({ peer });
  },

  resetPeer: () => {
    const { peer } = get();
    if (peer) peer.close();
    set({
      peer: null,
      remoteStream: null,
      offer: null,
      answer: null,
    });
  },

  createOffer: async () => {
    const { peer } = get();
    if (!peer) throw new Error("Peer not created");
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    set({ offer });
    return offer;
  },

  createAnswer: async (offer) => {
    const { peer } = get();
    if (!peer) throw new Error("Peer not created");
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    set({ answer });
    return answer;
  },

  setRemoteAnswer: async (answer) => {
    const { peer } = get();
    if (!peer) throw new Error("Peer not created");
    await peer.setRemoteDescription(answer);
  },

  sendStream: (stream) => {
    const { peer } = get();
    if (!peer) throw new Error("Peer not created");
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  },
}));
