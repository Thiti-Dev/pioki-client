import NotFound from "@/components/common/not-found";
import ProfileTemplate from "@/components/common/profile-template";
import FriendList from "@/components/pages/profile/client/friend-list";
import { getFriendList } from "@/lib/server/api/friends";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { Friend } from "@/shared/interfaces/friend.interface";

export default async function FriendListPage({params}: {params: {username: string}}){
    const friendRes = await getFriendList(params.username)
    if(!friendRes.ok){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    return (
        <ProfileTemplate userID={params.username}>
            <FriendList friends={(await friendRes.json() as PIOKIApiResponse<Friend[]>).data}/>
        </ProfileTemplate>
    );
}