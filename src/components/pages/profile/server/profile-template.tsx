import { UserData } from "@/shared/interfaces/user.interface"
import { workBench } from "@/utils/font"
import NextImage from "next/image"
import PostFeed from "../client/post-feed"
import { ReactNode } from "react"

export default async function ProfileServerTemplate({name,pictureURL,coin,children}: {name: string,userID: string,pictureURL: string,coin: string,children?: ReactNode}){
    return <>
    <div className="w-screen bg-gray-50 flex flex-row h-[90vh]">
        <div className="py-6">
            <div className={`bg-gray-800 h-full min-w-[400px] pt-20 ${workBench.className} rounded-lg`}>
                <div className="flex flex-col items-center pb-10 gap-1">
                    <NextImage alt="profile-image" className="rounded-full bg-gray-500" width={250} height={250} src={pictureURL}/>
                    {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                    <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white mt-5">{name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">PIOKI - Membership</span>
                    <div className="flex mt-4 md:mt-6">
                        {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a> */}
                        <a className="select-none py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Total Coin Earned: {coin}</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-[25px] w-full h-full">
            <div className="border-double border-4 border-gray-500 h-full overflow-y-auto">
                {children}
            </div>
        </div>
    </div>
</>
}