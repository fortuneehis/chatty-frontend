import { userInfo } from "os"
import { createContext, ReactNode, useMemo, useState } from "react"
import io, { Socket } from "socket.io-client"
import { useUser } from "./hooks"



const SocketContext = createContext<Socket|null>(null)


const SocketProvider = ({children}: {children: ReactNode}) => {

    const [ user, _ ] = useUser()

    const socket = io({
        // host: "",
        // auth: {
        //     token: user.token
        // }
    })

    const memoizedSocket = useMemo(()=> socket, [socket])

    return (
        <SocketContext.Provider value={memoizedSocket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider