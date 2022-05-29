import { motion } from "framer-motion"
import React, {  Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useSocket, useUser } from "../provider/hooks"
import { ChatService } from "../services"
import ChatBar from "./ChatBar"
import withDrawer from "./HOC/withDrawer"
import MessageBox from "./MessageBox"
import MiniProfile from "./MiniProfile"
import { MiniProfileSkeleton } from "./skeleton"
import StartChat from "./StartChat"

type ChatBoxProps = {
    selectedUserId: number|null
    setShowDrawer: Dispatch<SetStateAction<boolean>>
    showDrawer: boolean
    match: boolean
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}

const ChatBox = ({selectedUserId, setSelectedUserId, showDrawer, match, setShowDrawer}: ChatBoxProps) => {

    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [messages, setMessages] = useState<any>([])
    const [user] = useUser()
    const socket = useSocket()
    const messagesContainerRef = useRef<HTMLUListElement>(null)
    const [selectedMessage, setSelectedMessage] = useState<any>(null)


    useEffect(()=> {

        if(messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                behavior: "smooth",
                top: messagesContainerRef.current.scrollHeight
            })
        }

        socket.on("new_message", (data)=>{
            if(selectedUserId === data.sender.id) {
                if(messages) {
                    setMessages([
                       ...messages,
                       data
                    ])
                }
            }
            
        })

        return()=>{
            socket.off("new_message")
        }
    }, [selectedUserId, messages])

    useEffect(()=> {
        if(selectedUser) {
            socket.on(`user_status:${selectedUser.id}`, (status)=>{
                setSelectedUser({
                    ...selectedUser,
                    status
                })
            })
       

            return ()=>{
                socket.off(`user_status:${selectedUser.id}`)
            }
        }
        
    }, [selectedUser])

    useEffect(()=>{
        
        const fetchChat = async(id: number) => {
            const [data, error] = await ChatService.fetchChat(selectedUserId as number)

            if(error) {
                toast.error(error, {
                    duration: 15000
                })
            }

            setSelectedUser(data.user)
            
            if(data.chat) {
                setMessages(data.chat.messages)
            }
            

        }

        if(selectedUserId) {
            fetchChat(selectedUserId as number)
        }

        
     
    }, [selectedUserId])

    return ( 
        selectedUserId ? (<main className="fixed bottom-0 z-10 flex items-end w-full h-full bg-opacity-50 bg-dark-60 md:bg-transparent md:relative md:col-start-1 md:col-end-9 lg:col-start-5 lg:col-end-13">
            { 
            <motion.div
             initial={
             match ? {
                 y: 60,
                 opacity: 0
             } : undefined
            } 
             animate={
             match ? {
                 y: 0,
                 opacity: 1
             } : undefined
            }
             exit={
             match ? {
                 y: 60,
                 opacity: 0
             } : undefined
            }
             className="w-full relative mt-4 md:mt-0 h-[95%] md:h-full bg-dark-80  rounded-tl-[30px] rounded-tr-[30px] md:rounded-[10px] p-4 xl:p-8  flex flex-col">
                {match && <div className="absolute w-5 h-5 -translate-x-1/2 cursor-pointer md:invisible -top-4 left-1/2 bg-light-80" onClick={()=>{
                    setSelectedUserId(null)
                    setShowDrawer(false)
                }}></div>}
                <div className="">
                    {selectedUser ? <MiniProfile profileImg={"/unnamed.png"} username={selectedUser.username} status={selectedUser.status}/> : <MiniProfileSkeleton/>}
                </div>
                <ul ref={messagesContainerRef} className="flex-1 scrollbar-style flex basis-[40px] flex-col overflow-y-auto lg:overflow-y-hidden lg:hover:overflow-y-auto mb-2">
                    {
                        messages?.length > 0 && messages.map((message: any)=> (
                            <div key={message.id} onDoubleClick={()=>setSelectedMessage(()=>message)}>
                                <MessageBox  parent={message.parent} id={message.id} messageStatus={message.messageStatus} isSender={message.sender.id === user?.id} message={message.message} createdAt={message.createdAt}/>
                            </div>
                        ))
                    }
                
                </ul>
                <ChatBar setSelectedMessage={setSelectedMessage} selectedMessage={selectedMessage} messages={messages} setMessages={setMessages} selectedUserId={selectedUserId} />
            </motion.div>
           }
        </main>) : <StartChat/>
    )
}

export default withDrawer(ChatBox)({
    maxWidth: 768,
})