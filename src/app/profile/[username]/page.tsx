import NotFound from "@/components/common/not-found";
import { getUserData } from "@/lib/server/api/users/create-user";
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface";
import { UserData } from "@/shared/interfaces/user.interface";
import NextImage from "next/image"
import { workBench } from "@/utils/font"
import { useEffect } from "react";
import PostFeed from "@/components/pages/profile/client/post-feed";

export default async function Profile({params}: {params: {username: string}}) {
    const userDataRes = await getUserData(params.username)
    if(userDataRes.status === 404){
        return <NotFound mainHeader="Page Not Found" subHeader="Sorry, the user you are looking for could not be found."/>
    }
    const userData = await userDataRes.json() as PIOKIApiResponse<UserData>
    return (
        <>
            <div className="w-screen h-screen bg-gray-50 flex flex-row">
                <div className={`bg-gray-800 h-screen min-w-[400px] pt-20 ${workBench.className}`}>
                    <div className="flex flex-col items-center pb-10">
                    <NextImage alt="profile-image" className="rounded-full bg-red-500" width={250} height={250} src={userData.data.oauth_profile_picture}/>
                        {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">{userData.data.oauth_display_name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">PIOKI - Membership</span>
                        {/* <div className="flex mt-4 md:mt-6">
                            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                            <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Message</a>
                        </div> */}
                    </div>
                </div>
                <div className="p-[25px] w-full h-screen">
                        <div className="border-double border-4 border-gray-500 h-full overflow-y-auto">
                            <PostFeed user_id={params.username}/>
                        </div>
                </div>
            </div>
        </>
    );
  }
  