import ListKeptPosts from "@/components/pages/vault/client/list-kept-posts";
import ProfileTemplate from "@/components/common/profile-template";

export default async function VaultPage(){
    return (
        <ProfileTemplate>
            {/* <PostFeed user_id={params.username}/> */}
            <ListKeptPosts/>
        </ProfileTemplate>
    );
}