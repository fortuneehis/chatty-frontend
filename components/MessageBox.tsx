import classNames from "classnames"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useSocket, useUser } from "../provider/hooks"
import { convertToLocaleTime } from "../utils/date"
import { textOverflowFix } from "../utils/string"




type MessageBoxProps = {
    id: number
    message: string
    createdDate: string
    isSender: boolean
    messageStatus: "DELIVERED"|"SEEN"|"SENT"
    parent: any
}


const MessageBox = ({id, message, parent, createdDate, isSender, messageStatus}: MessageBoxProps) => {

    const socket = useSocket()

    const [user] = useUser()

    const [status, setStatus] = useState(()=>messageStatus)

    useEffect(()=>{
        console.log(status, "status")
        socket.on(`message:${id}`, (data)=>{
            console.log(" data status", data)
            setStatus(data)
        })

        return ()=>{
            socket.off(`message:${id}`)
        }
    }, [])

    return (
        <li className={`flex ${classNames({
            "justify-end": isSender,
            "justify-start": !isSender
            })} w-full`}>
            <div className="p-4 max-w-[100%] md:max-w-[70%]">
                <div className={`${classNames({
                    "bg-dark-60 rounded-br-none": isSender,
                    "bg-primary-100 rounded-bl-none": !isSender
                })} rounded-[10px] p-4`}>
                    {parent && <div className="p-2 bg-dark-100 mb-1 rounded-[10px]">
                        <p className="text-xs font-bold text-light-40">{parent.sender.id === user?.id ? "You" : parent.sender.username}</p>
                        <p className="text-xs text-light-40">{textOverflowFix(parent.message, 153)}</p>    
                    </div>}
                    <p className="text-base break-words text-light-100">{message}</p>
                    {isSender && <p className="text-sm text-light-60">{status}</p>}
                </div>
                <div className={`flex ${classNames({
                    "justify-end": isSender,
                    "justify-start": !isSender
                })} mt-4`}>
                    <p className="text-sm text-light-60">{convertToLocaleTime(createdDate)}</p>
                    
                </div>
            </div>

        </li>
    )
}

export default MessageBox