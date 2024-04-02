'use client'

import { Friend } from "@/shared/interfaces/friend.interface";
import { workBench } from "@/utils/font";
import Link from "next/link";

type Props = {
    friends: Friend[]
}

export default function FriendList({friends}: Props){

    const renderedFriends = friends.map((friend,index) => <Link href={`/profile/${friend.pioki_id}`}>
    
    <li className="flex items-center py-4 px-6 hover:bg-gray-300 cursor-pointer">
    <span className="text-gray-700 text-lg font-medium mr-4">{index+1}.</span>
    <img className="w-12 h-12 rounded-full object-cover mr-4" src={friend.oauth_profile_picture}
        alt={`${friend.id} - avatar`}/>
    <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-800">{friend.oauth_display_name}</h3>
        <p className="text-gray-600 text-base">Coins (🪙): {friend.coin_owned}</p>
    </div>
</li>
    </Link>)

    return <>
    <div className={`bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16 ${workBench.className}`}>
    <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Friends</h2>
    </div>
    <ul className="divide-y divide-gray-200">
        {renderedFriends}
    </ul>
</div>
    </>
}