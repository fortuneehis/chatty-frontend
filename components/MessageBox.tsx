import classNames from "classnames"
import { motion, PanInfo, useMotionValue } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { convertToLocaleTime } from "../utils/date"
import { textOverflowFix } from "../utils/string"




type MessageBoxProps = {
    id: number
    message: string
    createdAt: string
    isSender: boolean
    messageStatus: "DELIVERED"|"SEEN"|"SENT"
    parent: any
    sender: any
    setSelectedMessage: Dispatch<SetStateAction<any>>
    setFocusMessageInput: Dispatch<SetStateAction<boolean>>
}


const MessageBox = ({id, setSelectedMessage, setFocusMessageInput, sender, message, parent, createdAt, isSender, messageStatus}: MessageBoxProps) => {

    const socket = useSocket()

    const [user] = useUser()

    const [status, setStatus] = useState(()=>messageStatus)
    
    const messageRef = useRef<HTMLLIElement>(null)

    const [active, setActive] = useState(false)

    const router = useRouter()

    

    useEffect(()=>{

        const pathUrl = router.asPath.split("/")[1] || null
        if(pathUrl === `#message-${id}`) {
            setActive(true)
        }
       
    }, [router])

    useEffect(()=>{
        if(active) {

            let timeout = setTimeout(()=>{
                setActive(false)
                router.push("/")
            }, 1000)
        
            return()=>{
                clearTimeout(timeout)
            }
        }
    }, [active])

    useEffect(()=>{
        socket.on(`message:${id}`, (data)=>{
            setStatus(data)
        })

        return ()=>{
            socket.off(`message:${id}`)
        }
    }, [])

    return (
        <motion.li ref={messageRef} id={`message-${id}`} className={`flex rounded-[10px] transition-all ${classNames({
            "justify-end": isSender,
            "justify-start": !isSender
            })} w-full
            ${classNames({
                "bg-primary-100 bg-opacity-5": active
            })}
            `}>
            <motion.div 
            drag="x"
            dragSnapToOrigin={true}
            dragElastic={0.4} 
            dragConstraints={messageRef}
            onDragEnd={(_, info)=>{
               if(info.offset.x > 80) {
                   setSelectedMessage({
                       id,
                       message,
                       createdAt,
                       messageStatus,
                       sender,
                       parent
                   })
               }
            }}
            dragTransition={{
                bounceStiffness: 600
            }}
            onDragTransitionEnd={()=>setFocusMessageInput(true)}
            className="p-4 max-w-[100%] md:max-w-[70%]">
                <div className={`${classNames({
                    "bg-dark-60 rounded-br-none": isSender,
                    "bg-primary-100 rounded-bl-none": !isSender
                })} rounded-[10px] p-4`}>
                    {parent && <Link href={`/#message-${parent.id}`}><div className="p-2 bg-dark-100 mb-1 rounded-[10px]">
                        <p className="text-xs font-bold text-light-40">{parent.sender.id === user?.id ? "You" : parent.sender.username}</p>
                        <p className="text-xs text-light-40">{textOverflowFix(parent.message, 153)}</p>    
                    </div></Link>}
                    <p className="text-base break-words text-light-100">{message}</p>
                    {isSender && <p className="text-sm text-light-60">{status}</p>}
                </div>
                <div className={`flex ${classNames({
                    "justify-end": isSender,
                    "justify-start": !isSender
                })} mt-4`}>
                    <p className="text-sm text-light-60">{convertToLocaleTime(createdAt)}</p>
                    
                </div>
            </motion.div>

        </motion.li>
    )
}

export default MessageBox