
import { ChangeEvent,  Dispatch,  SetStateAction,  useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import {Picker} from "emoji-mart"
import { textOverflowFix } from "../utils/string"
import VoiceMessageBar from "./VoiceMessageBar"


type ChatBarProps = {
    selectedUserId: number|null,
    messages: any,
    selectedMessage: any
    setSelectedMessage: Dispatch<SetStateAction<any>>
    setMessages: Dispatch<SetStateAction<any>>

}


export const ChatBar = ({selectedUserId, setSelectedMessage, selectedMessage, messages, setMessages}: ChatBarProps) => {

    const [message, setMessage] = useState("")
    const [isVoiceMessage, setIsVoiceMessage] = useState(false)
    const socket = useSocket()
    const [user] = useUser()

    const messageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        const content = message.trim()
        if(content.length === 0 && !isVoiceMessage) {
            return
        } 

        if(isVoiceMessage) {
            //upload recorded message
        }
        
        socket.emit("new_message",{
            receiverId: selectedUserId,
            isVoiceMessage: false, 
            message: content,
            parentId: selectedMessage?.id ?? null
        }, (data: any)=>{

            if(messages) {
               setMessages((prev: any)=>[
                   ...prev,
                   data
               ])
            }
        })
        setMessage("")

        if(selectedMessage) {
            setSelectedMessage(null)
        }
        
    }

    return (
        <div className="flex flex-col items-start w-full mb-4 md:mb-0">
            {selectedMessage && (
                <div className="flex items-center">
                    <div className="relative p-2 my-1 bg-dark-60 rounded-[10px]">
                        <p className="text-xs font-bold text-light-40">{selectedMessage.sender.id === user?.id ? "You" : selectedMessage.sender.username}</p>
                        <p className="text-light-60 ">{textOverflowFix(selectedMessage.message, 25)}</p>
                    </div>
                    <div onClick={()=>setSelectedMessage(null)} className="p-1 ml-1 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0001 29.3333C23.3521 29.3333 29.3334 23.352 29.3334 16C29.3334 8.64799 23.3521 2.66666 16.0001 2.66666C8.64808 2.66666 2.66675 8.64799 2.66675 16C2.66675 23.352 8.64808 29.3333 16.0001 29.3333ZM20.6574 12C20.9233 11.9932 21.1878 12.0397 21.4354 12.1368C21.6829 12.2338 21.9086 12.3795 22.099 12.5651C22.2894 12.7508 22.4407 12.9727 22.5439 13.2178C22.6472 13.4628 22.7004 13.7261 22.7003 13.992C22.7002 14.2579 22.6469 14.5212 22.5434 14.7661C22.44 15.0111 22.2885 15.2329 22.098 15.4185C21.9075 15.604 21.6818 15.7495 21.4341 15.8464C21.1865 15.9433 20.9219 15.9896 20.6561 15.9827C20.1369 15.969 19.6435 15.7532 19.2812 15.3811C18.9188 15.009 18.7161 14.5101 18.7163 13.9907C18.7164 13.4713 18.9195 12.9725 19.2821 12.6006C19.6447 12.2288 20.1382 12.0133 20.6574 12ZM14.9227 21.2253C15.6339 21.368 16.3663 21.368 17.0774 21.2253C17.4147 21.156 17.7507 21.0507 18.0774 20.9147C18.3894 20.7813 18.6961 20.616 18.9827 20.424C19.2601 20.2347 19.5254 20.016 19.7707 19.772C20.0147 19.5293 20.2334 19.264 20.4227 18.9827L22.6334 20.472C22.0587 21.3238 21.3259 22.0575 20.4747 22.6333C19.6076 23.2185 18.6341 23.628 17.6094 23.8387C16.5471 24.0521 15.4529 24.0516 14.3907 23.8373C13.3657 23.6297 12.3922 23.2205 11.5267 22.6333C10.6756 22.0561 9.94211 21.3222 9.36542 20.4707L11.5761 18.9813C11.7667 19.2627 11.9854 19.528 12.2267 19.768C12.9629 20.5078 13.9005 21.0147 14.9227 21.2253ZM11.3334 12C11.5961 12.0001 11.8563 12.0519 12.099 12.1525C12.3417 12.2532 12.5622 12.4006 12.7479 12.5864C12.9336 12.7723 13.0809 12.9929 13.1814 13.2357C13.2818 13.4784 13.3335 13.7386 13.3334 14.0013C13.3333 14.2641 13.2815 14.5242 13.1809 14.7669C13.0802 15.0096 12.9328 15.2301 12.747 15.4158C12.5611 15.6015 12.3405 15.7488 12.0978 15.8493C11.855 15.9497 11.5948 16.0014 11.3321 16.0013C10.8015 16.0011 10.2927 15.7902 9.91759 15.4149C9.54252 15.0395 9.3319 14.5306 9.33208 14C9.33226 13.4694 9.54321 12.9606 9.91853 12.5855C10.2939 12.2104 10.8028 11.9998 11.3334 12Z" fill="#0065CA"/>
                        </svg>
                    </div> 
                </div>
            )}
        <div className="flex w-full">
            {!isVoiceMessage ? (
            <div className="flex-1 items-center bg-dark-60 p-2 md:p-4 rounded-[10px] flex">
                <textarea value={message} onChange={messageChangeHandler} className="flex-1 w-full text-base bg-transparent outline-none resize-none placeholder:text-light-40 h-7 text-light-40" placeholder="Write a message"/>
                <div className="flex">
                    <div onClick={()=>setIsVoiceMessage(()=>true)} className="p-1 mr-2 md:mr-6 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0001 21.3333C18.9414 21.3333 21.3334 18.9413 21.3334 16V8.00001C21.3334 5.04401 18.9534 2.63867 16.0281 2.63867C15.9342 2.63924 15.8407 2.65042 15.7494 2.67201C14.3804 2.73838 13.0893 3.32848 12.1433 4.32021C11.1972 5.31194 10.6686 6.6294 10.6667 8.00001V16C10.6667 18.9413 13.0587 21.3333 16.0001 21.3333Z" fill="#0065CA"/>
                            <path d="M14.6666 26.5747V29.3333H17.3333V26.5747C22.5853 25.9147 26.6666 21.4307 26.6666 16H23.9999C23.9999 20.412 20.4119 24 15.9999 24C11.5879 24 7.99992 20.412 7.99992 16H5.33325C5.33325 21.4293 9.41459 25.9147 14.6666 26.5747Z" fill="#0065CA"/>
                        </svg>
                    </div>
                    <div className="p-1 active:bg-dark-100 hover:bg-dark-100 rounded-[10px] cursor-pointer">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0001 29.3333C23.3521 29.3333 29.3334 23.352 29.3334 16C29.3334 8.64799 23.3521 2.66666 16.0001 2.66666C8.64808 2.66666 2.66675 8.64799 2.66675 16C2.66675 23.352 8.64808 29.3333 16.0001 29.3333ZM20.6574 12C20.9233 11.9932 21.1878 12.0397 21.4354 12.1368C21.6829 12.2338 21.9086 12.3795 22.099 12.5651C22.2894 12.7508 22.4407 12.9727 22.5439 13.2178C22.6472 13.4628 22.7004 13.7261 22.7003 13.992C22.7002 14.2579 22.6469 14.5212 22.5434 14.7661C22.44 15.0111 22.2885 15.2329 22.098 15.4185C21.9075 15.604 21.6818 15.7495 21.4341 15.8464C21.1865 15.9433 20.9219 15.9896 20.6561 15.9827C20.1369 15.969 19.6435 15.7532 19.2812 15.3811C18.9188 15.009 18.7161 14.5101 18.7163 13.9907C18.7164 13.4713 18.9195 12.9725 19.2821 12.6006C19.6447 12.2288 20.1382 12.0133 20.6574 12ZM14.9227 21.2253C15.6339 21.368 16.3663 21.368 17.0774 21.2253C17.4147 21.156 17.7507 21.0507 18.0774 20.9147C18.3894 20.7813 18.6961 20.616 18.9827 20.424C19.2601 20.2347 19.5254 20.016 19.7707 19.772C20.0147 19.5293 20.2334 19.264 20.4227 18.9827L22.6334 20.472C22.0587 21.3238 21.3259 22.0575 20.4747 22.6333C19.6076 23.2185 18.6341 23.628 17.6094 23.8387C16.5471 24.0521 15.4529 24.0516 14.3907 23.8373C13.3657 23.6297 12.3922 23.2205 11.5267 22.6333C10.6756 22.0561 9.94211 21.3222 9.36542 20.4707L11.5761 18.9813C11.7667 19.2627 11.9854 19.528 12.2267 19.768C12.9629 20.5078 13.9005 21.0147 14.9227 21.2253ZM11.3334 12C11.5961 12.0001 11.8563 12.0519 12.099 12.1525C12.3417 12.2532 12.5622 12.4006 12.7479 12.5864C12.9336 12.7723 13.0809 12.9929 13.1814 13.2357C13.2818 13.4784 13.3335 13.7386 13.3334 14.0013C13.3333 14.2641 13.2815 14.5242 13.1809 14.7669C13.0802 15.0096 12.9328 15.2301 12.747 15.4158C12.5611 15.6015 12.3405 15.7488 12.0978 15.8493C11.855 15.9497 11.5948 16.0014 11.3321 16.0013C10.8015 16.0011 10.2927 15.7902 9.91759 15.4149C9.54252 15.0395 9.3319 14.5306 9.33208 14C9.33226 13.4694 9.54321 12.9606 9.91853 12.5855C10.2939 12.2104 10.8028 11.9998 11.3334 12Z" fill="#0065CA"/>
                        </svg>
                    </div>  
                </div>
            </div>
            ): <VoiceMessageBar/>}
            <div onClick={sendMessage} className="bg-dark-60 active:bg-dark-100 hover:bg-dark-100 p-4 ml-2 rounded-[10px] cursor-pointer flex items-center justify-center">
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.2743 10.7924L1.80207 0.126876C1.58585 0.0194876 1.34521 -0.0209578 1.10809 0.010236C0.870966 0.0414299 0.647091 0.142983 0.462461 0.303103C0.27783 0.463223 0.14002 0.67534 0.0650332 0.914822C-0.00995393 1.1543 -0.0190415 1.41133 0.038826 1.65604L1.56967 8.12067L11.3686 11.9989L1.56967 15.8772L0.038826 22.3418C-0.0201303 22.5867 -0.0118012 22.8442 0.0628391 23.0843C0.137479 23.3244 0.275345 23.5371 0.460308 23.6975C0.645271 23.8579 0.869685 23.9594 1.1073 23.9901C1.34491 24.0208 1.5859 23.9795 1.80207 23.871L23.2743 13.2055C23.4912 13.0978 23.6747 12.9272 23.8032 12.7135C23.9318 12.4999 24 12.252 24 11.9989C24 11.7458 23.9318 11.498 23.8032 11.2843C23.6747 11.0707 23.4912 10.9 23.2743 10.7924V10.7924Z" fill="#0065CA"/>
                    </svg>
                </div>
            </div>
            {/* {typeof window !== "undefined" ? <Picker/> : null} */}
        </div>
        </div>
    )
}

export default ChatBar