import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import { UserService } from "../services"




const SearchBar = () => {

    const [value, setValue] = useState("")

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)

    }



    useEffect(()=> {
        const searchUsers = async() => {
            const [data, error] = await UserService.searchUsers(value)

            if(error) {
                console.log(error)
            }

            console.log(data)
        }

        if(value.length > 2) {
            searchUsers()
        }
    }, [value])

    
    return (
        <div className="relative mt-12">
            <div className="bg-dark-60 rounded-[10px] flex px-4">
                <div className="flex items-center justify-center w-4 h-16 p-4">
                    <span className="font-bold text-light-40">@</span>
                </div>
                <input onChange={valueChangeHandler} value={value} className="w-full bg-transparent outline-none text-light-80 placeholder:text-light-60" placeholder="Search"/>
            </div>
            {/* <div className="-bottom-24 z-50 overflow-auto p-2 absolute left-0 w-full max-h-[400px] rounded-[10px] bg-dark-60">
                <div className="flex items-center p-2">
                    <div className="relative mr-2 shrink-0">
                        <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                        { <div className="absolute right-0 w-4 h-4 border-2 rounded-full bottom-1 border-dark-80 bg-green"></div>}
                    </div>
                    <h3 className="text-lg font-bold text-light-100">JOHN_0X</h3>
                </div>
                <div className="flex items-center p-2">
                    <div className="relative mr-2 shrink-0">
                        <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                        { <div className="absolute right-0 w-4 h-4 border-2 rounded-full bottom-1 border-dark-80 bg-green"></div>}
                    </div>
                    <h3 className="text-lg font-bold text-light-100">JOHN_0X</h3>
                </div>
                <div className="flex items-center p-2">
                    <div className="relative mr-2 shrink-0">
                        <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                        { <div className="absolute right-0 w-4 h-4 border-2 rounded-full bottom-1 border-dark-80 bg-green"></div>}
                    </div>
                    <h3 className="text-lg font-bold text-light-100">JOHN_0X</h3>
                </div>
            </div> */}
        </div>
    )
}

export default SearchBar