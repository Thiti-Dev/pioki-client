import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import NotFound from "@/components/common/not-found"
import ProfileServerTemplate from "@/components/pages/profile/server/profile-template"
import PendingFriendList from "@/components/pages/vault/client/pending-friend-list"
import { getPendingFriendList } from "@/lib/server/api/friends"
import { getUserData } from "@/lib/server/api/users/create-user"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PendingFriend } from "@/shared/interfaces/friend.interface"
import { UserData } from "@/shared/interfaces/user.interface"
import { getServerSession } from "next-auth"

export default async function PendingRequestPage(){
    const session = await getServerSession(authOptions)
    const {user:{id}} = session!
    const userDataRes = await getUserData(id!)
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>

    const pendingFriendRequestRes = await getPendingFriendList()
    if(!pendingFriendRequestRes.ok) return // error indicator
    const pendingRequests = await pendingFriendRequestRes.json() as PIOKIApiResponse<PendingFriend[]>


    return <ProfileServerTemplate name={userData.data.oauth_display_name} userID={id!} pictureURL={userData.data.oauth_profile_picture} coin={userData.data.coin_amount}>
        <PendingFriendList pendings={pendingRequests.data}/>
    </ProfileServerTemplate>
}