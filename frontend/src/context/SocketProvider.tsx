"use client";
import { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { IMessage } from "@/index";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token"),
  },
});

interface MessageEvent {
  content: string;
  sentAt: string;
  type: string;
}

interface SocketContextType {
  sendMessage: (receiverId: string, message: MessageEvent) => void;
  receiveMessage: (message: IMessage) => void;
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });
    
    window.addEventListener("beforeunload", () => {
      console.log("SocketProvider useEffect cleanup");
      socket.disconnect();
    });
    return () => {
      socket.disconnect();
      socket.off("connect");
      window.removeEventListener("beforeunload", () => {
        socket.disconnect();
      });
    };
  }, []);

  
  const sendMessage = (receiverId: string, message: MessageEvent) => {
    socket.emit("message", { receiverId, message });
  };

  const receiveMessage = (message: IMessage) => {
    console.log(message);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("useSocket must be used within a SocketProvider");
  return socket;
};
