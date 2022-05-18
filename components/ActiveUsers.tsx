import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { ActiveUsersSkeleton } from "./skeleton"



type ActiveUsersProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}

type ActiveUsers = {
    id: number,
    username: string,
    profileImgUrl: string
}


const ActiveUsers = ({selectedUserId, setSelectedUserId}:ActiveUsersProps) => {

    const [loading, setLoading] = useState(true)

    const [user] = useUser()

    const [activeUsers, setActiveUsers] = useState<ActiveUsers[]|null>(null)

    const socket = useSocket()

    const selectedUserClickHandler = (userId: number) => {
        setSelectedUserId(()=>userId)
    }

    useEffect(()=> {
        socket.on("active_users", (users)=> {
            setActiveUsers(users.filter(({id}:{id:number})=> id !== user?.id))
        })

        return()=> {
            socket.off("active_users")
        }
    }, [])

    return (
        activeUsers ? (
        <div className="mt-12">
            <h1 className="mb-4 text-2xl font-bold text-light-100">Active Users</h1>
            <ul className="flex overflow-auto">
                {
                     activeUsers.map(({id, username, profileImgUrl})=>(
                        <li onClick={()=>selectedUserClickHandler(id)} key={id} className={`shrink-0 p-4 hover:bg-dark-60 ${selectedUserId === id ? "bg-dark-60" : ""} rounded-[10px] cursor-pointer mr-1`}>
                            <div>
                                <Image className="rounded-full" src={"/unnamed.png"} width={48} height={48}/>
                            </div>
                            <p className="text-xs text-center text-light-40">{username}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        ) : <ActiveUsersSkeleton/>
    )
}

export default ActiveUsers