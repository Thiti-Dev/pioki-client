import { sendFriendRequest } from "@/lib/server/api/friends";
import { checkRelationshipStatus } from "@/lib/server/api/me";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { RelationshipStatus } from "@/shared/interfaces/friend.interface";
import { workBench } from "@/utils/font";
import { getServerSession } from "next-auth";
import Image from "next/image";
import FriendButton from "../pages/profile/client/friend-button";
import { ReactNode } from "react";
import { getUserData } from "@/lib/server/api/users/create-user";
import NotFound from "./not-found";
import { UserData } from "@/shared/interfaces/user.interface";
import { authOptions } from "@/lib/server/next-auth";

type Props = {
    children?: ReactNode
    userID?: string
}

export default async function ProfileTemplate({children,userID}: Props){
    const session = await getServerSession(authOptions)
    const {user:{id}} = session!
    let isSelf = userID === undefined || id === userID

    const userDataRes = await getUserData(userID ?? id!) // if userID props not preset use current session
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }

    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>
    const {data:{coin_amount,oauth_display_name,oauth_profile_picture}} = userData

    let status: RelationshipStatus = "none";
    if(!isSelf && userID){
        const relationshipRes = await checkRelationshipStatus(userID)
        if(!relationshipRes.ok) return // server error indicator . . .
        const relationshipData = await relationshipRes.json() as PIOKIApiResponse<{status: RelationshipStatus}>
        status = relationshipData.data.status
    }

    async function sendFriendRequsetAction(): Promise<boolean>{
        'use server'
        if(!userID) return false
        const res= await sendFriendRequest(userID);
        return res.ok
    }

    return <>
    <div className="w-screen bg-gray-50 flex flex-row h-[90vh]">
        <div className="py-6">
            <div className={`bg-gray-800 h-full min-w-[400px] pt-20 ${workBench.className} rounded-lg`}>
                <div className="flex flex-col items-center pb-10 gap-1">
                    <Image alt="profile-image" className="rounded-full bg-gray-500" width={250} height={250} src={oauth_profile_picture}/>
                    {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                    <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white mt-5">{oauth_display_name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">PIOKI - Membership</span>
                    <div className="flex mt-4 md:mt-6 flex-col gap-3">
                        <a className="select-none py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Total Coin Earned: {coin_amount}</a>
                        {!isSelf ? <FriendButton relationshipStatus={status} sendFriendRequest={sendFriendRequsetAction}/> : null}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-[25px] w-full h-full">
            <div className="border-double border-4 border-gray-500 h-full overflow-y-auto">
                {children}
            </div>
        </div>
    </div>
</>
}