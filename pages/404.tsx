import Image from "next/image"
import Link from "next/link"




export const Custom404Page = () => {
    return (
        <div className="text-center flex flex-col items-center h-screen justify-center">
            <div>
                <Image src="/illustrations/10.png" width={300} height={300} />
            </div>
            <h1 className="text-light-100 font-bold text-4xl mb-2">404 - Not Found</h1>
            <p className="text-base text-light-40">Ouch!...it seems this page does not exist!</p>
            <Link href={"/"}>
            <a className="bg-dark-60 block mx-2 text-light-80 px-8 hover:bg-primary-100 py-4 font-bold rounded-[10px] mt-4">Go home</a>
            </Link>
        </div>
    )
}

export default Custom404Page