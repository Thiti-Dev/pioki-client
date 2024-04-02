import NotFound from "@/components/common/not-found";
import { getUserData } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import NextImage from "next/image"
import { workBench } from "@/utils/font"
import { useEffect } from "react";
import PostFeed from "@/components/pages/profile/client/post-feed";
import ProfileServerTemplate from "@/components/pages/profile/server/profile-template";

export default async function Profile({params}: {params: {username: string}}) {
    const userDataRes = await getUserData(params.username)
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>
    return (
        <ProfileServerTemplate name={userData.data.oauth_display_name} userID={params.username} coin={userData.data.coin_amount} pictureURL={userData.data.oauth_profile_picture}>
            <PostFeed user_id={params.username}/>
        </ProfileServerTemplate>
    );
  }
  