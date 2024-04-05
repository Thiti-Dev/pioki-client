import { workBench } from "@/utils/font";
import Link from "next/link";
import ProfileTemplate from "@/components/common/profile-template";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function VaultPage(){
    const session = await getServerSession(authOptions)
    const {user:{id}} = session!
    return (
        <ProfileTemplate>
            {/* <PostFeed user_id={params.username}/> */}

            <div className={`flex flex-col h-full justify-center ${workBench.className} tracking-widest gap-6`}>

                                
                <div className="flex flex-wrap justify-center">
                    <Link href={"/profile/"+id}>
                        <p className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">MY PROFILE</span>
                        </p>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center">
                        <Link href="/vault/create-post">
                            <p className="relative">
                                <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                                <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">CREATE POST</span>
                            </p>
                        </Link>
                    </div>


                <div className="flex flex-wrap justify-center">
                    <Link href="/vault/posts">
                        <p className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">VIEW KEPT POSTS</span>
                        </p>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link href={`/profile/${id}/friends`}>
                        <p className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">SEE FRIENDS</span>
                        </p>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link href={`/vault/pending-requests`}>
                        <p className="relative">
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
                            <span className="active:bg-gray-700 select-none fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 min-w-[300px] text-center">SEE FRIEND REQUESTS</span>
                        </p>
                    </Link>
                </div>

            </div>
        </ProfileTemplate>
    );
}