import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/components/common/not-found";
import FeedList from "@/components/pages/feed/client/feed";
import ProfileServerTemplate from "@/components/pages/profile/server/profile-template";
import { getUserData } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import { getServerSession } from "next-auth";

export default async function FeedPage(){
    const session = await getServerSession(authOptions)
    const {user:{id}} = session!
    const userDataRes = await getUserData(id!)
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>
    return <>
    <ProfileServerTemplate name={userData.data.oauth_display_name} userID={id!} pictureURL={userData.data.oauth_profile_picture} coin={userData.data.coin_amount}>
        <FeedList/>
    </ProfileServerTemplate>
    </>
}