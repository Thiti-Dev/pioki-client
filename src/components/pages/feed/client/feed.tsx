'use client'
import { getPostFeedsServerAction } from "@/actions/me"
import EmptyIndicator from "@/components/common/empty-indicator";
import LoadingIndicator from "@/components/common/loading-indicator";
import LoadingPrepend from "@/components/common/loading-prepend";
import { FeedPost, Post } from "@/shared/interfaces/post.interface"
import { workBench } from "@/utils/font";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react"

import Moment from 'react-moment';

export default function FeedList(){
    const [isKeepingPost, setIsKeepingPost] = useState(false)
    const ENCRYPTED_STRING = "#!@#$%-System-Encrypted-#!@#$%"
    const FAKE_LOAD_INTERVAL_MILLISECOND = 800;
    const CONSUME_SIZE = 5
    const feedDataToConsume = useRef<FeedPost[]>([])
    const [feeds, setFeeds] = useState<FeedPost[] | null>(null)
    const [isDoingFakeFetching, setIsDoingFakeFetching] = useState(false)
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined)
    const [keptPostIds,setKeptPostIds] = useState<Record<string,boolean>>({})

    useEffect(() => {
        if(!isDoingFakeFetching) return
        if(timeout.current !== undefined) return // if still some timeout going on

        timeout.current = setTimeout(() => {
            const cosumeLists = feedDataToConsume.current.slice(0,CONSUME_SIZE)
            feedDataToConsume.current = feedDataToConsume.current.slice(CONSUME_SIZE)
            setFeeds((prev) => ([
              ...prev!,
              ...cosumeLists
            ]))   
            timeout.current = undefined 
            setIsDoingFakeFetching(false)       
        }, FAKE_LOAD_INTERVAL_MILLISECOND);

    },[isDoingFakeFetching])

    const handleScroll = (event: SyntheticEvent) => {
        const target = event.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1;
    
        if (bottom) {
          if(!feedDataToConsume.current.length || !feeds) return
          setIsDoingFakeFetching(true)
        }
      };
    

    useEffect(() => {
        (async() => {
            const feedData = await getPostFeedsServerAction()
            if(!feedData.ok) return // do smth
            feedDataToConsume.current = feedData.data.slice(CONSUME_SIZE)
            setFeeds(feedData.data.slice(0,CONSUME_SIZE))
        })()
    },[])

    async function onPostKeepHandler(postID:number){
        if(isKeepingPost) return
        setIsKeepingPost(true)
        const res = await fetch(`/api/posts/${postID}/keep`,{method:'POST'})
        setIsKeepingPost(false)
        if(!res.ok) return // check if it is a transaction fail due to race condition

        // On keep success
        setKeptPostIds((prev) => ({
            ...prev,
            [postID]: true
        }))

        const copied = [...feeds!]
        const feed = copied.find((e) => e.id === postID)
        if(feed){
            feed.quota_left--; // UX
        }
        setFeeds(copied)

    }
    

    const renderedFeedList = useMemo(() => {
        if(feeds === null) return <div className={`w-full h-full flex justify-center ${workBench.className}`}>
                                        <LoadingIndicator/>
                                </div>
        if(!feeds.length) return <EmptyIndicator className={workBench.className} message="No activies are found . . ."/> // empty
        const items = feeds.map((feed) => {

            const renderedKeepBtn = feed.content === ENCRYPTED_STRING && !keptPostIds[feed.id] ?

            <div>
                    <div className="relative inline-flex group">
                        <div
                            className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                        </div>
                        <a onClick={() => onPostKeepHandler(feed.id)}  title="Get quote now" 
                            className={`active:bg-gray-200 select-none relative inline-flex items-center justify-center px-5 py-2 text-xs font-bold text-black transition-all duration-200 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900`}
                            role="button"> 
                            {isKeepingPost ? <LoadingPrepend/> : null}
                            Keep
                        </a>
                    </div>
                </div>

            : null

            return   <li key={feed.id} role="article" className="relative pl-8">
            <div className="flex flex-col flex-1 gap-4">
                    <p className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white">
                        <Link href={"/profile/"+feed.creator_id}>
                        
                        <Image src={feed.oauth_profile_picture} alt="user profile picture" title="profile picture" width="48" height="48" className="max-w-full rounded-full" />
                        </Link>
                    </p>
                <h4 className="flex flex-col items-start text-lg font-medium leading-8 lg:items-center md:flex-row text-slate-700">
                    <span className="flex-1">
                        <Link href={"/profile/"+feed.creator_id}>
                            <span>{feed.oauth_display_name}</span>
                        </Link>
                        <span className="text-base font-normal text-slate-500"> created a new post</span>
                    </span>
                    <span className="text-sm font-normal text-slate-400">
                        <Moment fromNow>{feed.created_at}</Moment>
                    </span>
                    </h4>
                <div className="flex">
                    <Image src="https://www.svgrepo.com/show/477129/label.svg" alt="tag" width="30" height="30"/>
                    <p>: {feed.spoiler_header}</p>
                </div>
                <div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 tracking-tighter">Initial-Quota: {feed.origin_quota_limit}</span> <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Quota-Left: {feed.quota_left}</span>
                    { feed.content !== ENCRYPTED_STRING || keptPostIds[feed.id] ? <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Owned</span> : null}
                </div>
                {renderedKeepBtn}
            </div>
         </li>
        })


        const renderedFakeFetchingIndicator = isDoingFakeFetching ? <LoadingIndicator/> : null

        return (
            <div onScroll={handleScroll} className="w-full h-full overflow-y-scroll p-2">
                <ul aria-label="feeds" role="feed" className={`${workBench.className} relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:border before:-translate-x-1/2 before:border-slate-200 before:border-dashed after:absolute after:top-6 after:left-8 after:bottom-6 after:border after:-translate-x-1/2 after:border-slate-200 `}>
                    {items}
                    {renderedFakeFetchingIndicator}
                </ul>
            </div>
        )
    },[feeds,isDoingFakeFetching])

    return <>
        {renderedFeedList}
    </>
}