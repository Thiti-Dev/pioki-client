'use client'

import EmptyIndicator from "@/components/common/empty-indicator"
import LoadingIndicator from "@/components/common/loading-indicator"
import { UserData } from "@/shared/interfaces/user.interface"
import { workBench } from "@/utils/font"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

type Props = {
    users: UserData[]
}

export default function DiscoveryPane(props: Props){
    const router = useRouter()
    const users = useRef([...props.users])
    const [displaying,setDisplaying] = useState<UserData | null>(null)
    const [noMore,setNoMore] = useState(false)

    useLayoutEffect(() => {
        if(!users.current.length) return
        const randomIndex = Math.floor(Math.random() * users.current.length)
        setDisplaying(users.current[randomIndex])
        users.current.splice(randomIndex,1)
    },[])

    function onDiscoveryNext(){
        if(!users.current.length) return setNoMore(true)
        const randomIndex = Math.floor(Math.random() * users.current.length)
        setDisplaying(users.current[randomIndex])
        users.current.splice(randomIndex,1)
    }


    if(!props.users.length) return <EmptyIndicator className={workBench.className} message="No users registered in our app . . . . ."/>
    if(noMore) return <EmptyIndicator className={workBench.className} message="You've gone through every users . . ."/>
    if(!displaying) return <LoadingIndicator/>

    return <div className={`w-full h-full flex flex-col justify-center ${workBench.className}`}>

<div
    className="min-w-[300px] mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden relative w-full">
        <Image className="w-full" src='https://user-images.githubusercontent.com/115187902/230700872-d5f44b85-56c7-4e27-80a4-6e2db901e60c.gif' alt='BG' fill/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <Image className="bg-gray-200" src={displaying.oauth_profile_picture} alt='profile pic' fill/>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold">{displaying.oauth_display_name}</h2>
        <p className="text-center text-xs">id: @{displaying.pioki_id}</p>
        <p className="text-gray-500">PIOKIMBER</p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-row items-center justify-around gap-2">
            <Image src="https://www.svgrepo.com/show/484569/coin.svg" width={20} height={20} alt="coin"/>
            <p> {displaying.coin_amount} coins made</p>
        </li>
    </ul>
    <div className="flex p-4 border-t mx-8 mt-2 gap-3">
        <button onClick={() => router.push(`/profile/${displaying.pioki_id}`)} className="active:bg-green-500 w-1/2 block mx-auto rounded-full bg-gray-500 hover:shadow-lg font-semibold text-white px-6 py-2">
            Visit
        </button>
        <button onClick={onDiscoveryNext} className="active:bg-red-500 w-1/2 block mx-auto rounded-full bg-blue-900 hover:shadow-lg font-semibold text-white px-6 py-2">Next</button>
    </div>
</div>

    </div>
}