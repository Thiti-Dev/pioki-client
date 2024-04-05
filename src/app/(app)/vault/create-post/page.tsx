import CreatePost from "@/components/pages/vault/client/create-post";
import ProfileTemplate from "@/components/common/profile-template";

export default async function VaultPage(){
    return (
        <ProfileTemplate>
            {/* <PostFeed user_id={params.username}/> */}
            <CreatePost/>
        </ProfileTemplate>
    );
}