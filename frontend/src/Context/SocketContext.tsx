import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";
import Peer from "peerjs";

interface SocketContextType {
  socket: Socket | null;
  user: Peer | null;
  stream: MediaStream | undefined;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  user: null,
  stream: undefined,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
  url?: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url = "http://localhost:5000",
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const navigate = useNavigate();

  // state variable to store the userId

  const [user, setUser] = useState<Peer>(); // new peer user
  const [stream, setStream] = useState<MediaStream>();

  const fetchUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
  };

  useEffect(() => {
    // Initialize the socket connection
    const socket = io(url);
    setSocket(socket);

    const userId = uuid();
    const newPeer = new Peer(userId);
    setUser(newPeer);

    fetchUserFeed();

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [url]);

  return (
    <SocketContext.Provider value={{ socket, user, stream }}>
      {children}
    </SocketContext.Provider>
  );
};
