import Image from "next/image"
import { useEffect, useState } from "react"
import { ActiveUsersSkeleton } from "./skeleton"




const ActiveUsers = () => {

    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        let time = setTimeout(()=> {
            setLoading(false)
        }, 3000)
        return () => clearTimeout(time)
    }, [loading])

    return (
        loading ? <ActiveUsersSkeleton/> : (
        <div className="mt-12">
            <h1 className="text-light-100 font-bold text-2xl mb-4">Active Users</h1>
            <ul className="overflow-auto flex">
                {
                    Array(8).fill(8).map(i=>(
                        <li key={i} className="shrink-0 pr-4">
                            <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                            <p className="text-light-40 text-xs">John Doe</p>
                        </li>
                    ))
                }
            </ul>
        </div>
        )
    )
}

export default ActiveUsers