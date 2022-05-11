import Image from "next/image"
import { useEffect, useState } from "react"
import config from "../utils/config"
import { MiniProfileSkeleton } from "./skeleton"


type MiniProfileProps = {
    profileImg: string
    username: string
    status: string
}


const MiniProfile = ({profileImg, username, status}: MiniProfileProps) => {
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        let time = setTimeout(()=> {
            setLoading(false)
        }, 3000)
        return () => clearTimeout(time)
    }, [])

    return (
        loading ? <MiniProfileSkeleton/> : (
       <div className="flex">
           <div className="max-w-[48px] shrink-0">
            <Image src={profileImg} className="rounded-full" width={48} height={48}/>
           </div>
           <div className="ml-2">
               <h2 className="text-light-80 text-lg lg:text-xl font-bold">{username}</h2>
               <p className="text-green text-sm">{status}</p>
           </div>
       </div>
        )
    )
}

export default MiniProfile