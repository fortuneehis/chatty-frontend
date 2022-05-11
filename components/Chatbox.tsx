import React from "react"
import MiniProfile from "./MiniProfile"


const ChatBox = () => {
    return (
        <main className="fixed z-10 top-0 w-full md:relative md:col-start-4 md:col-end-9 lg:col-start-5 lg:col-end-13 mt-14 md:mt-0 h-full bg-dark-80 rounded-tl-[10px] rounded-tr-[10px] md:rounded-[10px] p-8 flex flex-col">
            <div className="">
                <MiniProfile/>
            </div>
            <ul className="">
                <li className="">

                </li>
            </ul>
           
        </main>
    )
}

export default ChatBox