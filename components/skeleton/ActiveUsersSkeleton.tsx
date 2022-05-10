

const ActiveUsersSkeleton = () => {
    return (
        <div className="mt-12">
            <div className="bg-dark-60 w-28 h-6 my-1 mb-4"></div>
            <ul className="overflow-hidden flex">
                {
                    Array(5).fill([1,2,3,4,5]).map(i=>(
                        <li key={i} className="shrink-0 px-2 flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-dark-60"></div>
                            <div className="bg-dark-60 w-8 h-2 mt-1"></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ActiveUsersSkeleton