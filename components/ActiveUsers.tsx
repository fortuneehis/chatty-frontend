import Image from "next/image"




const ActiveUsers = () => {
    return (
        <div className="mt-12">
            <h1 className="text-light-100 font-bold text-2xl">Active Users</h1>
            <ul className="overflow-auto flex">
                {
                    Array(8).fill(8).map(i=>(
                        <li key={i} className="shrink-0 px-4">
                            <Image className="rounded-full" src="/unnamed.png" width={48} height={48}/>
                            <p className="text-light-40 text-xs">John Doe</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ActiveUsers