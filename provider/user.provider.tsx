import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { UserService } from "../services"
import { User } from "../types"




export const UserContext = createContext<[user: User|null, setUser: Dispatch<SetStateAction<User|null>>]|null>(null)


const UserProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState<User|null>(null)

    useEffect(()=> {

        const getCurrentUser = async() => {
            const [user, error] = await UserService.getCurrentUser()
            
            if(error) {
                console.log(error)
            }
            
            setUser(user.data)
        }

        getCurrentUser()
       
    }, [])

    return (
            user ? (
                <UserContext.Provider value={
            [user, setUser]
        }>
            {children}
        </UserContext.Provider>) : (
            <div>
                <p className="text-light-100">Loading user data...</p>
            </div>
        )
    )
}

export default UserProvider