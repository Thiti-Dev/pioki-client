import GenericError from "@/components/common/generic-error";
import ProfileTemplate from "@/components/common/profile-template";
import DiscoveryPane from "@/components/pages/discovery/client/discovery-pane";
import { getAllUsers } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import { workBench } from "@/utils/font";

export default async function DiscoveryPage(){
    const allUsersRes = await getAllUsers()
    if(!allUsersRes.ok) return <GenericError title="Something went wrong" description="failed fetching friend, please try refreshing . . ."/>
    const users = await allUsersRes.json() as PIOKIApiResponse<UserData[]>
    return <>
        <ProfileTemplate>
            <DiscoveryPane users={users.data}/>
        </ProfileTemplate>
    </>
}