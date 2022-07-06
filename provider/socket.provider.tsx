import { createContext, ReactNode, useEffect, useMemo } from "react"
import toast from "react-hot-toast"
import io, { Socket } from "socket.io-client"
import config from "../utils/config"
import { useUser } from "./hooks"

export const SocketContext = createContext<Socket | null>(null)

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useUser()

  const socket = useMemo(
    () =>
      io(config.SERVER_URL, {
        withCredentials: true,
        auth: {
          token: user?.authToken as string,
        },
      }),
    [user?.authToken]
  )

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id)
    })
    socket.on("connect_error", (err) => {
      toast.error(err.message, {
        id: "socket_connect_error",
        duration: 15000,
      })
    })

    socket.on("app_error", (err) => {
      toast.error(err, {
        id: "socket_app_error",
        duration: 15000,
      })
    })

    return () => {
      socket.off("app_error")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export default SocketProvider
