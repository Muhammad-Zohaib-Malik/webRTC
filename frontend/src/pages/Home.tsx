import CreateRoom from "@/components/CreateRoom";
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <CreateRoom />
        </div>
    )
}

export default Home