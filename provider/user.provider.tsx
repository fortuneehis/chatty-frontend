import Image from "next/image"
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
        if(!user) {
            getCurrentUser()
        }
        
       
    }, [])

    return (
             user ? (
                <UserContext.Provider value={
            [user, setUser]
        }>
            {children}
        </UserContext.Provider>) : (
            <div className="flex flex-col items-center">
                <div>
                    <Image src="/illustrations/5.png" width={100} height={100}/>
                </div>
                <p className="text-light-100 font-bold">Loading user data...</p>
            </div>
        )
    )
}

export default UserProvider