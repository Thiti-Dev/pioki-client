'use client'

import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { KeptPost } from "@/shared/interfaces/post.interface"
import { UserData } from "@/shared/interfaces/user.interface"
import { useEffect, useMemo, useState } from "react"
import NextImage from 'next/image'
import { workBench } from "@/utils/font"
import Typewriter from 'typewriter-effect';
import Link from "next/link"

export default function ListKeptPosts(){

    const [keptPosts,setKeptPosts] = useState<{userData: UserData, postDatas:KeptPost[] }[] | null>(null)
    const [currentlySeeking,setCurrentlySeeking] = useState<number|null>(null)

    useEffect(() => {
        (async() => {
            const res = await fetch("/api/me/kept_posts")
            const keptPostDatas = await res.json() as PIOKIApiResponse<KeptPost[]>
            const groupedData: Record<string, KeptPost[]> = {};
            keptPostDatas.data.forEach(item => {
                const piokiId = item.creator_data.pioki_id;
                if (!groupedData[piokiId]) {
                    groupedData[piokiId] = [];
                }
                groupedData[piokiId].push(item);
            });
            
            // Converting the object into an array of objects
            const result = Object.keys(groupedData).map(piokiId => ({
                userData: groupedData[piokiId][0].creator_data,
                postDatas: groupedData[piokiId]
            }));

            setKeptPosts(result)
            
            // Output the result
            // console.log(JSON.stringify(result, null, 2));
        })()
    })


    const renderedKeptPost = useMemo(() => {
        if(keptPosts === null) return null // loading inidicator
        if(!keptPosts.length) return null // shows empty result

        return keptPosts.map((data,index) => (<li key={index} role="article" className={`relative pl-8 ${workBench.className} tracking-widest`}>
        <div className="flex flex-col flex-1 gap-4">
        <Link href={`/profile/${data.userData.pioki_id}`} className="cursor-pointer">
            <div className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white">
                <NextImage src={data.userData.oauth_profile_picture} alt="user name" title="user name" width="48" height="48" className="max-w-full rounded-full" />
            </div>
            <h4 className="flex flex-col items-start text-lg font-medium leading-8 lg:items-center md:flex-row text-slate-700"><span className="flex-1">{data.userData.oauth_display_name}<span className="text-base font-normal text-slate-500"> <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">{data.postDatas.length} posts owned</span> </span></span></h4>
        </Link>
        <ul aria-label="Activity feed" role="feed" className="relative flex flex-col gap-12 py-12 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:border before:-translate-x-1/2 before:border-slate-200 before:border-dashed after:absolute after:top-6 after:left-6 after:bottom-6 after:border after:-translate-x-1/2 after:border-slate-200 ">
            {data.postDatas.map((post,index) => (

                <li role="article" key={index} className={`relative pl-6 ${workBench.className}`}>
                <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
                </span>
                <div className="flex flex-col flex-1 gap-0">
                <h4 className="text-sm font-medium text-slate-700">{post.post_data.spoiler_header || 'Untitled'}</h4>
                <div>
                    <p className="px-5 text-xs text-slate-500">Kept at: {post.keep_data.created_at.substring(0, 10)}</p>
                    <span className="ml-10 bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 tracking-tighter">Initial-Quota: {post.post_data.origin_quota_limit}</span> <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Quota-Left: {post.post_data.quota_left}</span>
                </div>
                <div className="ml-16 container mx-auto flex p-3">
                    {currentlySeeking === post.post_data.id ? 
                        <Typewriter
                        options={{
                          strings: post.post_data.content,
                          autoStart: true,
                          loop: false,

                        }}
                      />
                    : <button onClick={() => setCurrentlySeeking(post.post_data.id)} className="bg-bg font-bold text-center py-2 px-[15px] text-sm border-2 border-black rounded-md shadow-yellow py-1 px-1  hover:bg-yellow-300 focus:outline-none bg-yellow">
                        🔑 Seek
                    </button>}
                </div>

                </div>
                </li>
            ))}
        </ul>
        </div>
    </li>))

    }, [keptPosts,currentlySeeking])

    return <>
        <ul aria-label="Kept posts feed" role="feed" className="relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:border before:-translate-x-1/2 before:border-slate-200 before:border-dashed after:absolute after:top-6 after:left-8 after:bottom-6 after:border after:-translate-x-1/2 after:border-slate-200 ">
            {renderedKeptPost}
        </ul>
    </>
}