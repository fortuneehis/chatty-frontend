import { useContext } from "react"
import { UserContext } from "../user.provider"




const useSocket = () => {
    const context = useContext(UserContext)

    if(context === null) {
        throw new Error("context should be used inside its Provider")
    }

    return context

}

export default useSocket