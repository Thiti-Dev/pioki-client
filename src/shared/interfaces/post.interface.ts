import { UserData } from "./user.interface";

interface Post {
    id: number;
    creator_id: string;
    spoiler_header?: any;
    content: string;
    origin_quota_limit: number;
    quota_left: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        pioki_id: string;
        is_active: boolean;
        created_at: string;
    };
}

interface PostKeeper{
    id: number;
    pioki_id: string;
    post_id: number;
    pass_along_at: string | null;
    created_at: string;
    updated_at: string;
}

interface KeptPost{
    post_data: Post,
    creator_data: UserData
    keep_data: PostKeeper
}

export type {
    Post,PostKeeper,KeptPost
}