import { useContext } from "react"
import { UserContext } from "../user.provider"




const useUser = () => {
    const context = useContext(UserContext)

    if(context === null) {
        throw new Error("useUser must be used in a UserProvider")
    }
    
    const [user, setUser] = context

    // if(user === null) {
    //     throw new Error("User is required!")
    // }

    return context

}

export default useUser