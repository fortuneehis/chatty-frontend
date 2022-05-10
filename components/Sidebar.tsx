import ActiveUsers from "./ActiveUsers"
import Chats from "./Chats"
import MiniProfile from "./MiniProfile"
import SearchBar from "./SearchBar"
import { ActiveUsersSkeleton, MiniProfileSkeleton } from "./skeleton"


const Sidebar = () => {
    return (
        <aside className="col-start-1 col-end-5 h-full bg-dark-80 rounded-[10px] p-8">
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