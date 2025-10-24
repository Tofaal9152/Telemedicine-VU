"use client";
import { useContext } from "react";
import { WebSocketContext } from "@/context/webSocketContext";

export const useSocket = () => {
  return useContext(WebSocketContext);
};
