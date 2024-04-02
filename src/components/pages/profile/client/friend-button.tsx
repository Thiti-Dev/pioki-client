'use client'

import { RelationshipStatus } from "@/shared/interfaces/friend.interface"
import { useMemo, useState } from "react"

type Props = {
    relationshipStatus: RelationshipStatus
    sendFriendRequest: () => Promise<boolean> 
}

export default function FriendButton({relationshipStatus: rs,sendFriendRequest}: Props){

    const [relationshipStatus,setRelationshipStatus] = useState<RelationshipStatus>(rs)

    async function onSendFriendRequestHandler(afterward: RelationshipStatus){
        const sendRequestStatus = await sendFriendRequest()
        if(sendRequestStatus){
            setRelationshipStatus(afterward)
        }

    }

    let renderedFriendButton = useMemo(() => {
        switch (relationshipStatus) {
            case "friended":
                return <a className="select-none py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center">Your friend</a>
            case "none":
                return <div onClick={() => onSendFriendRequestHandler('requested')} className="cursor-pointer items-center px-4 py-2 ms-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</div>
            case "requested":
                return <div className="cursor-pointer items-center px-4 py-2 ms-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Requested</div>
            case "pending":
                return <div onClick={() => onSendFriendRequestHandler('friended')} className="cursor-pointer items-center px-4 py-2 ms-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept Requeset</div>
            default:
                return null
                break;
        }
    },[relationshipStatus])

    return <>
        {renderedFriendButton}
    </>
}