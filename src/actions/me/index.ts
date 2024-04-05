'use server'

import { removeFriend } from "@/lib/server/api/friends";
import { getPostFeeds } from "@/lib/server/api/me";
import { PIOKIApiResponse, ServerActionResponse } from "@/shared/interfaces/common.interface";
import { FeedPost, Post } from "@/shared/interfaces/post.interface";

export async function getPostFeedsServerAction(): Promise<ServerActionResponse<FeedPost[]>>{
    const res = await getPostFeeds();
    if(!res.ok) return {ok:false}

    return {ok:true,data: (await res.json() as PIOKIApiResponse<FeedPost[]>).data}
}