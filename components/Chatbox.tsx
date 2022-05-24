import React, {  Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { ChatService, UserService } from "../services"
import ChatBar from "./ChatBar"
import withDrawer from "./HOC/withDrawer"
import MessageBox from "./MessageBox"
import MiniProfile from "./MiniProfile"
import { MiniProfileSkeleton } from "./skeleton"
import StartChat from "./StartChat"

type ChatBoxProps = {
    selectedUserId: number|null,
    matches: string,
    match: boolean,
    setShowDrawer: Dispatch<SetStateAction<boolean>>

}

const ChatBox = ({selectedUserId, match}: ChatBoxProps) => {

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
            if(selectedUserId === data.senderId) {
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
        
        const fetchUser = async(id: number) => {
            const [data, error] = await ChatService.fetchChat(selectedUserId as number)

            if(error) {
                console.log(error)
            }

            console.log(data)

            setSelectedUser(data.user)
            
            if(data.chat) {
                setMessages(data.chat.messages)
            }
            

        }

        if(selectedUserId) {
            fetchUser(selectedUserId as number)
        }

        
     
    }, [selectedUserId])

    return ( 
        selectedUser ? (<main className="fixed top-0 z-10 w-full h-full bg-dark-60 md:relative md:col-start-1 md:col-end-9 lg:col-start-5 lg:col-end-13 bg-opacity-30">
            { <div className="w-full mt-4 md:mt-0 h-full bg-dark-80 rounded-tl-[10px] rounded-tr-[10px] md:rounded-[10px] p-4 md:p-8 flex flex-col">
            <div className="">
                {selectedUser ? <MiniProfile profileImg={"/unnamed.png"} username={selectedUser.username} status={selectedUser.status}/> : <MiniProfileSkeleton/>}
            </div>
            <ul ref={messagesContainerRef} className="flex-1 flex basis-[40px] flex-col overflow-y-auto lg:overflow-y-hidden lg:hover:overflow-y-auto mb-2">
                {
                    messages.length > 0 && messages.map((message: any)=> (
                        <div onDoubleClick={()=>setSelectedMessage(()=>message)}>
                            <MessageBox key={message.id} id={message.id} messageStatus={message.messageStatus} isSender={message.senderId === user?.id} message={message.message} createdDate={message.createdDate}/>
                        </div>
                    ))
                }
                
            </ul>
            <ChatBar selectedMessage={selectedMessage} messages={messages} setMessages={setMessages} selectedUserId={selectedUserId} />
           </div>}
        </main>) : <StartChat/>
    )
}

export default withDrawer(ChatBox)