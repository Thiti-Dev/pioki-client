import NotFound from "@/components/common/not-found";
import FriendList from "@/components/pages/profile/client/friend-list";
import ProfileServerTemplate from "@/components/pages/profile/server/profile-template";
import { getFriendList } from "@/lib/server/api/friends";
import { getUserData } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { Friend } from "@/shared/interfaces/friend.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import { workBench } from "@/utils/font";

export default async function FriendListPage({params}: {params: {username: string}}){
    const userDataRes = await getUserData(params.username)
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const friendRes = await getFriendList(params.username)
    if(!friendRes.ok){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>
    return (
        <ProfileServerTemplate name={userData.data.oauth_display_name} userID={params.username} coin={userData.data.coin_amount} pictureURL={userData.data.oauth_profile_picture}>
            <FriendList friends={(await friendRes.json() as PIOKIApiResponse<Friend[]>).data}/>
        </ProfileServerTemplate>
    );
}