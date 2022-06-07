import classNames from "classnames"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { convertToLocaleTime } from "../utils/date"
import { textOverflowFix } from "../utils/string"


type ChatProps = {
    userId: number
    username: string
    recentMessage: any
    selectedUserId: number|null
    chatId: number
    status: string
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}

const activeChatClassName = (userId: number, selectedUserId: number | null) => classNames({
    "bg-dark-60": userId === selectedUserId
})


const Chat = ({chatId, userId, username, status, recentMessage, selectedUserId, setSelectedUserId}: ChatProps) => {

    const [user] = useUser()
    const socket = useSocket()
    const [userStatus, setUserStatus] = useState(()=>status)

    const selectedUserClickHandler = (userId: number) => {
        setSelectedUserId(()=>userId)
    }

    useEffect(()=>{
        socket.on(`user_status:${userId}`, (status)=> {
            console.log("status updated", status)
            setUserStatus(status)
        }) 

        return ()=>{
            socket.off(`user_status:${userId}`)
        }
    },[])



    return (
        <li onClick={()=>selectedUserClickHandler(userId)} key={chatId} className={`flex items-center p-4 relative ${ activeChatClassName(userId, selectedUserId)} hover:bg-dark-60 cursor-pointer  rounded-[10px] mb-4`}>
        <div className="relative mr-2 shrink-0">
            <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
            {userStatus === "ONLINE" && <div className="absolute right-0 w-4 h-4 border-2 rounded-full bottom-1 border-dark-80 bg-green"></div>}
        </div>
        <div className="flex flex-1 flex:row lg:flex-col xl:flex-row">
            <div className="flex-1 shrink-0">
                <h3 className="text-lg font-bold text-light-100">{username}</h3>
                <p className={`text-sm text-light-60 ${classNames({
                    "font-bold": recentMessage.messageStatus === "SENT" && recentMessage.sender.id !== user?.id
                })}`}>{recentMessage.sender.id === user?.id ? `You: ${textOverflowFix(recentMessage.message, 20)}` : textOverflowFix(recentMessage.message, 20)}</p>
            </div>
            <div className="flex flex-col items-end lg:flex-row xl:flex-col">
                <p className="mt-2 mb-2 text-xs text-left text-light-40 lg:mb-0 lg:mr-2 xl:mr-0 xl:mb-2">{`${convertToLocaleTime(recentMessage.createdAt)}`}</p>
                <div className="w-4 h-4 rounded-full bg-primary-100"></div>
            </div>
        </div>
        
    </li>     
    )
}


export default Chat