import NotFound from "@/components/common/not-found";
import { getUserData } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import NextImage from "next/image"
import { workBench } from "@/utils/font"
import { useEffect } from "react";
import PostFeed from "@/components/pages/profile/client/post-feed";
import ProfileTemplate from "@/components/common/profile-template";

export default async function Profile({params}: {params: {username: string}}) {
    return (
        <ProfileTemplate userID={params.username}>
            <PostFeed user_id={params.username}/>
        </ProfileTemplate>
    );
  }
  