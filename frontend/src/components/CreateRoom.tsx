
import { useSocket } from '@/Context/SocketContext'
import { Button } from '../components/ui/button'
import React, { useContext } from 'react'

const CreateRoom: React.FC = () => {
  const { socket } = useSocket()
  console.log("socket", socket)

  const initRoom = () => {
    console.log("initiating a req", socket)
    socket?.emit("create-room")

  }

  return (
    <Button onClick={initRoom}> 
      Start a new Meeting in a new Room
    </Button>
  )
}

export default CreateRoom