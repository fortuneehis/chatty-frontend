import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ActiveUsersSkeleton } from "./skeleton"



type ActiveUsersProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}


const ActiveUsers = ({selectedUserId, setSelectedUserId}:ActiveUsersProps) => {

    const [loading, setLoading] = useState(true)

    const selectedUserClickHandler = (userId: number) => {
        setSelectedUserId(()=>userId)
    }

    useEffect(()=> {
        let time = setTimeout(()=> {
            setLoading(false)
        }, 4000)
        return () => clearTimeout(time)
    }, [])

    return (
        loading ? <ActiveUsersSkeleton/> : (
        <div className="mt-12">
            <h1 className="text-light-100 font-bold text-2xl mb-4">Active Users</h1>
            <ul className="overflow-auto flex">
                {
                    [1,2,3,4,5,6,7,8,9].map(i=>(
                        <li onClick={()=>selectedUserClickHandler(i)} key={i} className={`shrink-0 p-4 hover:bg-dark-60 ${selectedUserId === i ? "bg-dark-60" : ""} rounded-[10px] cursor-pointer mr-1`}>
                            <div>
                                <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                            </div>
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