import { useSocket } from "@/Context/SocketContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket } = useSocket();

  useEffect(() => {
    // emitting this event either room creator or the joiner in the room the server know
    //that new user joine the room
    socket?.emit("joined-room", { roomId: id });
  }, []);

  return <div>Room: {id}</div>;
};

export default Room;
