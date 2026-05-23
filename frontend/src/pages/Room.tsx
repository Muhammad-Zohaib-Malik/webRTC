import UserFeedPlayer from "@/components/UserFeedPlayer";
import { useSocket } from "@/Context/SocketContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user, stream } = useSocket();

  const fetchParticipants = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log("fetch room participants");
    console.log(roomId, participants);
  };

  useEffect(() => {
    // emitting this event either room creator or the joiner in the room the server know
    //that new user joine the room
    if (user && socket) {
      console.log("user id :", user.id);
      socket.emit("joined-room", { roomId: id, peerId: user.id });
      socket.on("get-users", fetchParticipants);
    }
  }, [id, user, socket]);

  return (
    <div>
      Room: {id}
      <UserFeedPlayer stream={stream} />
    </div>
  );
};

export default Room;
