



const SearchBar = () => {

    
    return (
        <div className="mt-12">
            <div className="bg-dark-60 rounded-[10px] flex px-4">
                <div className="flex items-center justify-center w-4 h-16 p-4">
                    <span className="font-bold text-light-40">@</span>
                </div>
                <input className="w-full bg-transparent outline-none text-light-80 placeholder:text-light-60" placeholder="Search"/>
            </div>
        </div>
    )
}

export default SearchBar