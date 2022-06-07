import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserService } from "../services"
import toast from "react-hot-toast"
import MiniProfile from "./MiniProfile"
import classNames from "classnames"


type SearchBarProps = {
    selectedUserId: number|null
    setSelectedUserId: Dispatch<SetStateAction<number|null>>
    setShowChatboxDrawer: Dispatch<SetStateAction<boolean>>
}


const SearchBar = ({setSelectedUserId, selectedUserId, setShowChatboxDrawer}: SearchBarProps) => {

    const [value, setValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(false)

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        
    }

    const resultClickEventHandler = (userId: number) => {
        setSelectedUserId(()=>userId)
        setShowChatboxDrawer(true)
        setShowResults(false)
        setValue("")
    }

    useEffect(()=> {
        const searchUsers = async() => {

            if(value.trim().length === 0) {
                setShowResults(false)
                return
            }
            const [data, error] = await UserService.searchUsers(value.trim())

            if(error) {
                toast.error(error.message, {
                    duration: 15000
                })
            }
            setShowResults(true)
            setSearchResults(data.users)
        }

        searchUsers() 
        
    }, [value])

    
    return (
        <div className="relative mt-12">
            <div className="bg-dark-60 rounded-[10px] flex px-4">
                <div className="flex items-center justify-center w-4 h-16 p-4">
                    <span className="font-bold text-light-40">@</span>
                </div>
                <input onChange={valueChangeHandler} value={value} className="w-full bg-transparent outline-none text-light-80 placeholder:text-light-60" placeholder="Search"/>
            </div>
            {showResults && <div className="top-full mt-2 block z-50 overflow-auto p-2 absolute left-0 w-full  max-h-[200px] rounded-[10px] bg-dark-60">
                {searchResults.length > 0 ? searchResults?.map((user: any)=>(
                    <div key={user.id} onClick={()=>resultClickEventHandler(user.id)} className={`p-4 cursor-pointer hover:bg-dark-80 ${classNames({
                        "bg-dark-60": user.id === selectedUserId
                    })} rounded-[10px]`}>
                        <MiniProfile username={user.username} status={user.status} profileImg="/unnamed.png"/>
                    </div>
                )) : <p className="text-center text-light-60">No results found</p>}
            </div>}
        </div>
    )
}

export default SearchBar

 {/* <div className="relative mr-2 shrink-0">
                        <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                        { <div className="absolute right-0 w-4 h-4 border-2 rounded-full bottom-1 border-dark-80 bg-green"></div>}
                    </div>
                    <h3 className="text-lg font-bold text-light-100">JOHN_0X</h3> */}