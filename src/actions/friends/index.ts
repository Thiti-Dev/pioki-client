'use server'

import { removeFriend, sendFriendRequest } from "@/lib/server/api/friends";

export async function acceptFriendRequest(requesterID: string){
    const res= await sendFriendRequest(requesterID);
    return res.ok
}

export async function declineRelationship(requesterID: string){
    const res= await removeFriend(requesterID);
    return res.ok
}