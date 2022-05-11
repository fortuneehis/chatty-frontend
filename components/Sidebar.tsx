import { useUser } from "../provider/hooks"
import ActiveUsers from "./ActiveUsers"
import Chats from "./Chats"
import MiniProfile from "./MiniProfile"
import SearchBar from "./SearchBar"
import { ActiveUsersSkeleton, MiniProfileSkeleton } from "./skeleton"


const Sidebar = () => {

    // const [user, _] = useUser()

    return (
        <aside className=" w-full overflow-y-auto col-start-1 col-end-5 md:col-start-1 md:col-end-4 lg:col-start-1 lg:col-end-5 h-full bg-dark-80 md:rounded-[10px] p-8 z-[1]">
            <MiniProfile profileImg="/unnamed(2).jpg" username="emmanuel_ob" status="online"/>
            {/* <MiniProfileSkeleton/> */}
            <SearchBar/>
            {/* <ActiveUsersSkeleton/> */}
            <ActiveUsers/>
            <Chats/>
        </aside>
    )
}

export default Sidebar