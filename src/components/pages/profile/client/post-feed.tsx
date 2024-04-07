'use client'

import EmptyIndicator from "@/components/common/empty-indicator"
import LoadingIndicator from "@/components/common/loading-indicator"
import LoadingPrepend from "@/components/common/loading-prepend"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { Post } from "@/shared/interfaces/post.interface"
import { workBench } from "@/utils/font"
import { useEffect, useLayoutEffect, useMemo, useState } from "react"

export default function PostFeed({user_id}: {user_id: string}){
    const [isKeepingPost, setIsKeepingPost] = useState(false)
    const [posts,setPosts] = useState<Post[]| null>(null)
    const [keptPostIds,setKeptPostIds] = useState<Record<string,boolean>>({})
    // const [mappedPostOwnedByPostId, setMappedPostOwnedByPostId] = useState<Record<number,boolean>>({})
    useEffect(() => {
        (async() => {
            /* ------------------------------- Posts Fetch ------------------------------ */
            const postsRes = await fetch(`/api/users/${user_id}/posts`)
            const postData: PIOKIApiResponse<Post[]> = await postsRes.json()
            setPosts(postData.data)
        })();

        (async() => {
            /* --------------------------- Kept Post Ids Fetch -------------------------- */
            const keptPostsRes = await fetch(`/api/me/kept_post_ids`)
            const keptPostIds: PIOKIApiResponse<Record<number,boolean>> = await keptPostsRes.json()     
            setKeptPostIds(keptPostIds.data)
        })();
    },[])

    async function onPostKeepHandler(postID:number){
        if(isKeepingPost) return
        setIsKeepingPost(true)
        const res = await fetch(`/api/posts/${postID}/keep`,{method:'POST'})
        setIsKeepingPost(false)
        if(!res.ok){
            const error = await res.json()
            console.log(error)
            return
        }

        // On keep success
        setKeptPostIds((prev) => ({
            ...prev,
            [postID]: true
        }))

        const copiedPosts = [...posts!]
        const post = copiedPosts.find((e) => e.id === postID)
        if(post){
            post.quota_left--; // UX
        }
        setPosts(copiedPosts)

    }

    const renderedPosts = useMemo(() => {
        if(!posts) return (
            <div className={`w-full h-full flex justify-center ${workBench.className}`}>
                                        <LoadingIndicator/>
                                </div>
        )
        if(!posts.length) return <div className={`${workBench.className} w-full h-full`}>
            <EmptyIndicator message="No posts are found . . ."/>
        </div>
        return <>
                <ul aria-label="Activity feed" role="feed" className={`relative flex flex-col gap-12 py-12 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:border before:-translate-x-1/2 before:border-slate-200 before:border-dashed after:absolute after:top-6 after:left-6 after:bottom-6 after:border after:-translate-x-1/2 after:border-slate-200 ${workBench.className}`}>
                {
                    posts.map((post,index) => {
                        const isOwned = keptPostIds[post.id]
                        return (
                            <li key={index} role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                        <h4 className="text-lg font-medium text-slate-700"> {post.spoiler_header ?? 'Untitiled'} </h4>
                        <p className="text-xs text-slate-500">{post.created_at.substring(0, 10)}</p>
                        <p className="text-xs text-slate-400 p-1"><span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Initial-Quota: {post.origin_quota_limit}</span> <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">Quota-left: {post.quota_left}</span> {keptPostIds[post.id] ? <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Owned</span> : null}</p>
                        {!isOwned && post.quota_left>0 ? 
                                    <div className="p-1">
                                    <div className="relative inline-flex  group">
                                        <div
                                            className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                                        </div>
                                        <button onClick={() => onPostKeepHandler(post.id)} title="Get quote now" 
                                            className={`relative inline-flex items-center justify-center px-5 py-2 text-xs font-bold text-black transition-all duration-200 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900`}
                                            role="button"> 
                                            {isKeepingPost ? <LoadingPrepend/> : null}
                                            Keep
                                        </button>
                                    </div>
                            </div>
                        : null}
                    </div>
                </li>
                        )
                    })
                }
                {/* <li role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-sm font-medium text-slate-700"> Task list created for project</h4>
                    <p className="text-xs text-slate-500">13:31pm</p>
                    </div>
                </li>
                <li role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-sm font-medium text-slate-700"> Warning! Project name cannot be empty </h4>
                    <p className="text-xs text-slate-500">13:32pm</p>
                    </div>
                </li>
                <li role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-sm font-medium text-slate-700"> New user added </h4>
                    <p className="text-xs text-slate-500">13:56pm</p>
                    </div>
                </li>
                <li role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" role="presentation">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-sm font-medium text-slate-700"> Warning! Project is going to be expired </h4>
                    <p className="text-xs text-slate-500">13:32pm</p>
                    </div>
                </li>
                <li role="article" className="relative pl-6">
                    <span className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 -translate-x-1/2 rounded-full text-slate-700 ring-2 ring-white bg-slate-200 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" role="presentation"></svg>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    </span>
                    <div className="flex flex-col flex-1 gap-0">
                    <h4 className="text-sm font-medium text-slate-700"> Project deleted </h4>
                    <p className="text-xs text-slate-500">13:32pm</p>
                    </div>
                </li> */}
                </ul>
        </>
    },[posts,keptPostIds,isKeepingPost])

    return <>
        {renderedPosts}
    </>
}