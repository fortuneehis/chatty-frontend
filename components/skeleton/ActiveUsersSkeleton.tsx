

const ActiveUsersSkeleton = () => {
    return (
        <div className="mt-12">
            <div className="h-6 my-1 mb-4 bg-dark-60 w-28"></div>
            <ul className="flex overflow-hidden">
                {
                    [1,2,3,4,5].map(i=>(
                        <li key={i} className="flex flex-col items-center pr-2 shrink-0">
                            <div className="w-12 h-12 rounded-full bg-dark-60"></div>
                            <div className="w-8 h-2 mt-1 bg-dark-60"></div>
                        </li>
                    )) 
                }
            </ul>
        </div>
    )
}

export default ActiveUsersSkeleton