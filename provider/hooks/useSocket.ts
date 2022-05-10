import { useContext } from "react"
import { UserContext } from "../user.provider"




const useSocket = () => {
    const context = useContext(UserContext)

    if(context === null) {
        throw new Error("useSocket must be used in a SocketProvider")
    }

    return context

}

export default useSocket