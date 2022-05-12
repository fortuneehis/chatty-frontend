import React, { Dispatch, SetStateAction, useEffect } from "react"
import MiniProfile from "./MiniProfile"

type ChatBoxProps = {
    selectedUserId: number|null
}

const ChatBox = ({selectedUserId}: ChatBoxProps) => {

    useEffect(()=>{
        //fetch user by id and
    }, [selectedUserId])

    return (
        <main className="fixed bg-dark-60 z-10 top-0 w-full md:relative md:col-start-4 md:col-end-9 lg:col-start-5 lg:col-end-13 h-full bg-opacity-30">
            <div className="w-full mt-14 md:mt-0 h-full bg-dark-80 rounded-tl-[10px] rounded-tr-[10px] md:rounded-[10px] p-8 flex flex-col">
            <div className="">
                <MiniProfile profileImg="/unnamed.png" username="benita65_D" status="online"/>
            </div>
            <ul className="">
                <li className="">

                </li>
            </ul>
           </div>
        </main>
    )
}

export default ChatBox