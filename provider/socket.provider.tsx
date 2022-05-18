import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import io, { Socket } from "socket.io-client"
import config from "../utils/config"
import { useUser } from "./hooks"



export const SocketContext = createContext<Socket|null>(null)


const SocketProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useUser()


    const socket = useMemo(()=>io(config.SERVER_URL,{
        withCredentials: true,
        auth: {
            token: user?.authToken as string
        }
    }), [io])

    useEffect(()=>{
       socket.on("connect", ()=>{
           console.log(socket.id)
       })
        socket.on("connect_error", (err)=>{
            console.log(err)
        })

        socket.on("app_error", (err)=> {
            console.log(err)
        })
        
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider