import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../socket.provider"
import useUser from "./useUser"


const useSocket = () => {
    const context = useContext(SocketContext)

    if(context === null) {
        throw new Error("useSocket must be used inside a SocketProvider")
    }

    return context

}

export default useSocket