import ActiveUsers from "./ActiveUsers"
import Chats from "./Chats"
import MiniProfile from "./MiniProfile"
import SearchBar from "./SearchBar"
import { ActiveUsersSkeleton, MiniProfileSkeleton } from "./skeleton"


const Sidebar = () => {
    return (
        <aside className=" w-full col-start-1 col-end-5 md:col-start-1 md:col-end-4 lg:col-start-1 lg:col-end-5 h-full bg-dark-80 md:rounded-[10px] p-8">
            <MiniProfile/>
            {/* <MiniProfileSkeleton/> */}
            <SearchBar/>
            {/* <ActiveUsersSkeleton/> */}
            <ActiveUsers/>
            <Chats/>
        </aside>
    )
}

export default Sidebar