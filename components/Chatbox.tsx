import React, { Dispatch, SetStateAction, useEffect } from "react"
import ChatBar from "./ChatBar"
import MessageBox from "./MessageBox"
import MiniProfile from "./MiniProfile"

type ChatBoxProps = {
    selectedUserId: number|null
}

const ChatBox = ({selectedUserId}: ChatBoxProps) => {

    useEffect(()=>{
        //fetch user by id and
    }, [selectedUserId])

    return ( 
        <main className="fixed top-0 z-10 w-full h-full bg-dark-60 md:relative md:col-start-1 md:col-end-9 lg:col-start-5 lg:col-end-13 bg-opacity-30">
            <div className="w-full mt-4 md:mt-0 h-full bg-dark-80 rounded-tl-[10px] rounded-tr-[10px] md:rounded-[10px] p-8 flex flex-col">
            <div className="">
                <MiniProfile profileImg="/unnamed.png" username="benita65_D" status="online"/>
            </div>
            <ul className="flex-1 flex basis-[40px] flex-col overflow-y-auto mb-2">
                <MessageBox/>
                <MessageBox/>
                <MessageBox/>
                <MessageBox/>
            </ul>
            <ChatBar selectedUserId={selectedUserId} />
           </div>
        </main>
    )
}

export default ChatBox