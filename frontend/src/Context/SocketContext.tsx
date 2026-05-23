import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

interface SocketProviderProps {
    children: React.ReactNode;
    url?: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, url = 'http://localhost:5000' }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        // Initialize the socket connection
        const socket = io(url);
        setSocket(socket);

        const enterRoom = ({ roomId }: { roomId: string }) => {
            navigate(`/room/${roomId}`)
        }

        socket.on("room-created", enterRoom)


        // Cleanup on unmount 
        return () => {
            socket.disconnect();
        };
    }, [url]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
