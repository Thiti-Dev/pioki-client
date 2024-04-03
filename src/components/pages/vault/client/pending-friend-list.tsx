'use client'

import { acceptFriendRequest, declineRelationship } from "@/actions/friends"
import { PendingFriend } from "@/shared/interfaces/friend.interface"
import { workBench } from "@/utils/font"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import Image from "next/image"
import EmptyIndicator from "@/components/common/empty-indicator"

type Props = {
    pendings: PendingFriend[]
}


export default function PendingFriendList({pendings}: Props){

    const [pendingLists,setPendingLists] = useState< PendingFriend[]>(pendings)
    const [recentlyAccepted, setRecentlyAccepted] = useState<Record<string,'Rejected' | 'Accepted'>>({})

    const route = useRouter()

    async function onAcceptHandler(targetID: string){
       const isSuccess = await acceptFriendRequest(targetID)
        if(!isSuccess) return // do smth

        setRecentlyAccepted((prev) => ({
            ...prev,
            [targetID]: 'Accepted'
        }))
        // setPendingLists(pendingLists.filter(data => data.pioki_id !== targetID)) // excluded it out
    }

    async function onDeclineHandler(targetID: string){
        const isSuccess = await declineRelationship(targetID)
         if(!isSuccess) return // do smth
 
         setRecentlyAccepted((prev) => ({
             ...prev,
             [targetID]: 'Rejected'
         }))
         // setPendingLists(pendingLists.filter(data => data.pioki_id !== targetID)) // excluded it out
     }
 
    const renderedFriends = useMemo(() => {
        return pendingLists.map((requester,index) => {

            const renderedActionBtns = recentlyAccepted[requester.pioki_id] ? <p className={`text-${recentlyAccepted[requester.pioki_id] === 'Accepted' ? 'green' : 'red'}-500`}>{recentlyAccepted[requester.pioki_id]}</p> :
            <>
                    <p className="relative" onClick={(e) => {
                        e.stopPropagation(); // stop propagating up to its upper div
                        onAcceptHandler(requester.pioki_id)
                    }}>
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                        <span className="active:bg-gray-700 select-none fold-bold relative h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 w-[130px] text-center">Accept</span>
                    </p>
        
                    <p className="relative" onClick={(e) => {
                        e.stopPropagation()
                        onDeclineHandler(requester.pioki_id)
                    }}>
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                        <span className="active:bg-gray-700 select-none fold-bold relative h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 w-[130px] text-center">Decline</span>
                    </p>
            </>

            return <li key={index} className="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer" onClick={() => route.push(`/profile/${requester.pioki_id}`)}>
            <span className="text-gray-700 text-lg font-medium mr-4">{index+1}.</span>
            <img className="w-12 h-12 rounded-full object-cover mr-4" src={requester.oauth_profile_picture}
                alt={`${requester.id} - avatar`}/>
            <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{requester.oauth_display_name}</h3>
                <span>Coins (🪙): {requester.coin_owned}</span>
                <div className="flex flex-wrap justify-end gap-2">
                    {renderedActionBtns}
                </div>
                
            </div>
        </li>
        }
        
       )
    },[pendingLists,recentlyAccepted])

    return <>
    <div className={`bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16 ${workBench.className}`}>
    <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Pending Requests</h2>
    </div>
    <ul className="divide-y divide-gray-200">
        {renderedFriends}
        
        {!pendingLists.length ?         <li className="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
            <EmptyIndicator/>
        </li> : null}
    </ul>
</div>
    </>   
}