import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"


const Error = () => {

    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div>
                <Image className="max-w-[300px] max-h-[300px]" src="/illustrations/9.png" width={300} height={300} />
            </div>
            <h1 className="mb-2 text-4xl font-bold text-light-100">500 - Uh...oh!</h1>
            <p className="mx-4 text-base text-light-40">Something went wrong but its not your fault :)</p>
            <button onClick={()=>router.reload()} className="bg-dark-60 block mx-2 text-light-80 px-8 hover:bg-primary-100 py-4 font-bold rounded-[10px] mt-4">Reload</button>
        </div>
    )
}

export default Error