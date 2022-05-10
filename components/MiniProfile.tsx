import Image from "next/image"



const MiniProfile = () => {
    return (
       <div className="flex">
           <Image src="/unnamed.png" className="rounded-full" width={48} height={48}/>
           <div className="ml-2">
               <h2 className="text-light-80 text-xl font-bold">David Johnson</h2>
               <p className="text-green text-sm">Online</p>
           </div>
       </div>
    )
}

export default MiniProfile