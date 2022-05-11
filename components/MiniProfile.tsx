import Image from "next/image"
import { useEffect, useState } from "react"
import config from "../utils/config"
import { MiniProfileSkeleton } from "./skeleton"


const MiniProfile = () => {
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        let time = setTimeout(()=> {
            setLoading(false)
        }, 3000)
        return () => clearTimeout(time)
    }, [loading])

    return (
        loading ? <MiniProfileSkeleton/> : (
       <div className="flex">
           <div className="">
            <Image src="/unnamed.png" className="rounded-full" width={48} height={48}/>
           </div>
           <div className="ml-2">
               <h2 className="text-light-80 text-lg lg:text-xl font-bold">David Johnson</h2>
               <p className="text-green text-sm">Online</p>
           </div>
       </div>
        )
    )
}

export default MiniProfile