import { useContext } from "react"
import { UserContext } from "../user.provider"

const useUser = () => {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error("useSocket must be used inside a SocketProvider")
  }

  return context
}

export default useUser
