"use client";

import { useAppSelector } from "@/store/hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { clientEnv } from "@/config/clientEnv"; // Ensure this has API_BASE_URL
import { selectAuthUser } from "@/store/features/auth";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const user = useAppSelector(selectAuthUser);
  const userId = user?.id; // Assuming user object has an id

  useEffect(() => {
    if (!userId) return;

    // Connect to /notifications namespace
    const socketUrl = `${clientEnv.API_BASE_URL}/notifications`;
    console.log("Connecting to socket:", socketUrl, "with userId:", userId);

    const newSocket = io(socketUrl, {
      query: { userId },
      transports: ["websocket"], // Force websocket to avoid polling issues
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket Connected via Provider:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket Disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err);
      setIsConnected(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
