import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MediaQueryAllQueryable } from "react-responsive"
import { useSocket, useUser } from "../provider/hooks"
import ActiveUsers from "./ActiveUsers"
import Chats from "./Chats"
import withDrawer from "./HOC/withDrawer"
import MiniProfile from "./MiniProfile"
import SearchBar from "./SearchBar"
import { MiniProfileSkeleton } from "./skeleton"


type SidebarProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
    matches: MediaQueryAllQueryable
    match: boolean
    setShowDrawer: Dispatch<SetStateAction<boolean>>
}

const Sidebar = ({selectedUserId, setSelectedUserId, match}: SidebarProps) => {

    const [user, setUser] = useUser()
    const socket = useSocket()
    const [loadingStatus, setLoadingStatus] = useState(true)


    useEffect(()=>{
        console.log(match, " sidebar")
    },[match])

    useEffect(()=>{
        
        socket.on(`user_status:${user?.id}`, (status)=> {
         
            if(user) {
                setUser({
                    ...user,
                    status
                })
            }
            setLoadingStatus(false)
        })

        return ()=>{
            socket.off(`user_status:${user?.id}`)
        }
    },[])

    return (
        <aside className="w-full md:w-2/4 md:z-50 overflow-y-auto col-start-1 col-end-5 md:fixed md:top-0 md:left-0 lg:relative lg:w-full lg:col-start-1 lg:col-end-5 h-full bg-dark-80 md:rounded-[10px] p-4 xl:p-8 z-[1]">
            {
                
                user !== null && !loadingStatus ? (
                    <MiniProfile profileImg={user?.profileImg ?? "/unnamed(2).jpg"} username={user?.username!} status={user.status.toLowerCase()}/>
                ) : (
                    <MiniProfileSkeleton/>
                )
            }
            <SearchBar/>
            <ActiveUsers selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />
            <Chats selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}/>
        </aside>
    )
}

export default withDrawer(Sidebar)