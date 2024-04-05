import ProfileTemplate from "@/components/common/profile-template"
import PendingFriendList from "@/components/pages/vault/client/pending-friend-list"
import { getPendingFriendList } from "@/lib/server/api/friends"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PendingFriend } from "@/shared/interfaces/friend.interface"

export default async function PendingRequestPage(){
    const pendingFriendRequestRes = await getPendingFriendList()
    if(!pendingFriendRequestRes.ok) return // error indicator
    const pendingRequests = await pendingFriendRequestRes.json() as PIOKIApiResponse<PendingFriend[]>


    return <ProfileTemplate>
        <PendingFriendList pendings={pendingRequests.data}/>
    </ProfileTemplate>
}