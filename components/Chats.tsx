import classNames from "classnames"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChatService } from "../services"
import { ChatsSkeleton } from "./skeleton"



type ChatsProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}

const activeChatClassName = (userId: number, selectedUserId: number | null) => classNames({
    "bg-dark-60": userId === selectedUserId
})


const Chats = ({selectedUserId, setSelectedUserId}: ChatsProps) => {

    const [chats, setChats] = useState<any>(null)

    const [loading, setLoading] = useState(true)

    const selectedUserClickHandler = (userId: number) => {
        setSelectedUserId(()=>userId)
    }

    useEffect(()=>{
        const fetchChats = async() => {
            const [chats, error] = await ChatService.fetchChats()

            if(error) {
                console.log(error)
            }

            console.log(chats)
            setChats(chats)
            setLoading(false)
        } 

        fetchChats()
    }, [])

    return (
        !loading && chats !== null ? (
        <div className="my-12">
            <h1 className="mb-4 text-2xl font-bold text-light-100 lg:mb-2 xl:mb-4">Chats</h1>
            <ul>
                {
                chats.length > 0 ? (
                    chats.map(({id, user, recentMessage}: any)=>(
                    <li onClick={()=>selectedUserClickHandler(user.id)} key={id} className={`flex p-4 relative ${ activeChatClassName(user.id, selectedUserId)} hover:bg-dark-60 cursor-pointer  rounded-[10px] mb-4`}>
                        <div className="mr-2 shrink-0">
                            <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                        </div>
                        <div className="flex flex-1 flex:row lg:flex-col xl:flex-row">
                            <div className="flex-1 shrink-0">
                                <h3 className="text-lg font-bold text-light-100">{user.username}</h3>
                                <p className="text-sm text-light-60">{user.recentMessage}</p>
                            </div>
                            <div className="flex flex-col items-end lg:flex-row xl:flex-col">
                                <p className="mt-2 mb-2 text-xs text-left text-light-40 lg:mb-0 lg:mr-2 xl:mr-0 xl:mb-2">11:00PM</p>
                                <div className="w-4 h-4 rounded-full bg-primary-100"></div>
                            </div>
                        </div>
                        
                    </li>    
                ))) : (
                    <div className=" flex flex-col p-8 items-center bg-dark-100 mx-4 rounded-[10px]">
                        <div className="w-12 h-12 bg-dark-60 rounded-[10px] mb-4"></div>
                        <p className="text-lg font-bold text-center text-light-100 ">Start a chat</p>
                    </div>
                )
                }
                
            </ul>
        </div>
        ) : <ChatsSkeleton/>
    )
}

export default Chats