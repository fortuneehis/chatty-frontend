import { createContext, Dispatch, ReactNode, useState } from "react"




export const UserContext = createContext<[user: any, setUser: Dispatch<any>]|null>(null)


const UserProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={
            [user, setUser]
        }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider