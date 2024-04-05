import ProfileTemplate from "@/components/common/profile-template";
import FeedList from "@/components/pages/feed/client/feed";

export default async function FeedPage(){
    return <>
    <ProfileTemplate>
        <FeedList/>
    </ProfileTemplate>
    </>
}