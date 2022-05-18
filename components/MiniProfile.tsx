import classNames from "classnames"
import Image from "next/image"


type MiniProfileProps = {
    profileImg: string
    username: string
    status: string
}

const userStatusClassnames = (status: string) => classNames({
    "text-green": status === "online",
    "text-light-60": status === "offline"
})


const MiniProfile = ({profileImg, username, status}: MiniProfileProps) => {

    return (
       <div className="flex">
           <div className="max-w-[48px] shrink-0">
            <Image src={profileImg} className="rounded-full" width={48} height={48}/>
           </div>
           <div className="ml-2">
               <h2 className="text-lg font-bold text-light-80 lg:text-xl">{username}</h2>
               <p className={`text-sm ${userStatusClassnames(status)}`}>{status}</p>
           </div>
       </div>
    )
}

export default MiniProfile