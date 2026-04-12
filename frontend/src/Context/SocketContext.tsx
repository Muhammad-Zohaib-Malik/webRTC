import SocketIoClient from "socket.io-client";
import { createContext } from "react";

const ws_Server = "http://localhost:5000";

const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(ws_Server);

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}