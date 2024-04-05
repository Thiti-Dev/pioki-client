import Image from "next/image"
import Link from "next/link"

type Props = {
    title: string
    description: string
}

export default function GenericError(props: Props){
    return <>
    <div className="w-full h-screen flex flex-col items-center justify-center">
        <Image src="https://www.svgrepo.com/show/301170/error.svg" width={200} height={250} alt="error"/>
        <div className="flex flex-col items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">{props.title}</p>
            <p className="md:text-lg lg:text-xl text-gray-600 mt-8">{props.description}</p>
            <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150" title="Return Home">
                <div className="flex flex-wrap justify-center">
                    <Link href="/">
                        <p className="relative">
                                <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">Return to home</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</>
}