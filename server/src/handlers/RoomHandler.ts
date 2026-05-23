import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import IRoomParams from "../interfaces/IRoomParams.js";

const rooms: Record<string, string[]> = {};
export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = uuidv4();
    socket.join(roomId);
    rooms[roomId] = [];

    socket.emit("room-created", { roomId });
    console.log("Room created with id", roomId);
  };

  const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      // if the given roomId exists
      console.log(`New user joined room ${roomId} with peerId ${peerId}`);
      rooms[roomId].push(peerId);
      socket.join(roomId);

      socket.emit("get-users", { roomId, participants: rooms[roomId] });
    }
  };

  // when to call the above function
  // We Will Call the above function when the client will emit events to create room and join room

  socket.on("create-room", createRoom);
  socket.on("joined-room", joinedRoom);
};

export default roomHandler;
