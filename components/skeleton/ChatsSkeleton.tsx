


const ChatsSkeleton = () => { 
    return (
        <div className="mt-12">
        <div className="h-6 my-1 mb-4 bg-dark-60 w-28"></div>
        <ul>
            {[1,2,3].map(i=>(
                <li key={i} className={`flex p-4 relative mb-4`}>
                    <div className="mr-2 shrink-0">
                        <div className="w-12 h-12 rounded-full bg-dark-60"></div>
                    </div>
                    <div className="flex flex-1 flex:row lg:flex-col xl:flex-row">
                        <div className="flex-1 shrink-0">
                            <div className="w-24 h-6 my-1 bg-dark-60"></div>
                            <div className="w-16 h-2 bg-dark-60"></div>
                        </div>
                        <div className="flex flex-col items-end mt-2 lg:flex-row xl:flex-col">
                            <div className="w-16 h-2 bg-dark-60"></div>
                        </div>
                    </div>
                    
                </li>    
            ))}
            
        </ul>
        </div>
    )
}

export default ChatsSkeleton