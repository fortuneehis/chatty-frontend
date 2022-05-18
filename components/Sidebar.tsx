import { Dispatch, SetStateAction, useEffect } from "react"
import { useSocket, useUser } from "../provider/hooks"
import ActiveUsers from "./ActiveUsers"
import Chats from "./Chats"
import MiniProfile from "./MiniProfile"
import SearchBar from "./SearchBar"
import { MiniProfileSkeleton } from "./skeleton"


type SidebarProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
}

const Sidebar = ({selectedUserId, setSelectedUserId}: SidebarProps) => {

    const [user, setUser] = useUser()
    const socket = useSocket()
    

    useEffect(()=>{
        socket.on(`user_status:${user?.id}`, (status)=> {
         
            if(user) {
                setUser({
                    ...user,
                    status
                })
            }
        })
    },[])

    return (
        <aside className="w-full md:w-2/4 md:z-50 overflow-y-auto col-start-1 col-end-5 md:fixed md:top-0 md:left-0 lg:relative lg:w-full lg:col-start-1 lg:col-end-5 h-full bg-dark-80 md:rounded-[10px] p-4 xl:p-8 z-[1]">
            {
                
                user !== null ? (
                    <MiniProfile profileImg={user?.profileImg ?? "/unnamed(2).jpg"} username={user?.username!} status={user.status && user?.status.toLowerCase()}/>
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

export default Sidebar