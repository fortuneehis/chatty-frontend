



const SearchBar = () => {
    return (
        <div className="mt-12">
            <div className="bg-dark-60 rounded-[10px] flex px-4">
                <div className="w-4 h-16 flex items-center justify-center p-4">
                    <span className="text-light-40 font-bold">@</span>
                </div>
                <input className="bg-transparent w-full outline-none text-light-80 placeholder:text-light-60" placeholder="Search"/>
            </div>
        </div>
    )
}

export default SearchBar