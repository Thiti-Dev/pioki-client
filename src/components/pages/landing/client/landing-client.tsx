"use client";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import StepVisual from "./step-visual"
import NextImage from "next/image"
import Developers from "./developers"
import { useInView } from "react-intersection-observer"
import StatisticSection from "./statistic"
import { signIn, useSession } from "next-auth/react";
import { workBench } from "@/utils/font"
import { emptyWindowLocationHash } from "@/utils/url/common";
import IAM from "./iam";
import { loadImage } from "@/utils/listeners/image";


function Initailize(flag: MutableRefObject<boolean>,cb: () => void){
    return useLayoutEffect(() => {
        if(!flag.current){
            flag.current = true
            // inject the skeleton
            const mainHeaderContainer = document.getElementById("main-header-container")
            // if(mainHeaderContainer){
            //     mainHeaderContainer.innerHTML+=
            //     `
            //     <div id="loading-mask" role="status" class="flex items-center justify-center h-full w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-300">
            //     <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="40" height="40" rx="8" fill="#000000" fill-opacity="0.4"></rect> <path d="M30.2667 9.73334H9.73335C9.23828 9.73334 8.76349 9.93 8.41342 10.2801C8.06335 10.6301 7.86668 11.1049 7.86668 11.6V28.4C7.86668 28.8951 8.06335 29.3699 8.41342 29.7199C8.76349 30.07 9.23828 30.2667 9.73335 30.2667H30.2667C30.7618 30.2667 31.2365 30.07 31.5866 29.7199C31.9367 29.3699 32.1334 28.8951 32.1334 28.4V11.6C32.1334 11.1049 31.9367 10.6301 31.5866 10.2801C31.2365 9.93 30.7618 9.73334 30.2667 9.73334Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3899 17.2566C15.6525 16.9941 15.8 16.638 15.8 16.2667C15.8 15.8954 15.6525 15.5393 15.3899 15.2767C15.1274 15.0142 14.7713 14.8667 14.4 14.8667C14.0287 14.8667 13.6726 15.0142 13.4101 15.2767C13.1475 15.5393 13 15.8954 13 16.2667C13 16.638 13.1475 16.9941 13.4101 17.2566C13.6726 17.5192 14.0287 17.6667 14.4 17.6667C14.7713 17.6667 15.1274 17.5192 15.3899 17.2566ZM27.1932 17.8598C26.8288 17.4954 26.2379 17.4954 25.8735 17.8598L21.5932 22.1397L18.5197 19.0667C18.3447 18.8917 18.1074 18.7934 17.8599 18.7934C17.6124 18.7934 17.375 18.8917 17.2 19.0667L12.7265 23.5401C12.3621 23.9046 12.3621 24.4954 12.7265 24.8599C13.091 25.2243 13.6818 25.2243 14.0463 24.8599L17.8599 21.0467L20.9333 24.1197C21.1084 24.2947 21.3457 24.393 21.5932 24.393C21.8407 24.393 22.078 24.2947 22.2531 24.1197L27.1932 19.1796C27.5576 18.8152 27.5576 18.2243 27.1932 17.8598Z" fill="#B5B5B5"></path> </g></svg>
            //     <span class="sr-only">Loading...</span>
            // </div>
            //     `
            // }
            // -------------------
            loadImage("/assets/landing-background-detailed.jpg").then(() => {
                if(mainHeaderContainer) mainHeaderContainer.style.backgroundImage = "url('/assets/landing-background-detailed.jpg')"
                document.getElementById("loading-mask")?.remove() // remove the loading mask
                const el = document.getElementById("main-header-parallax")
                if(el){
                    el.classList.remove("hidden")
                    el.classList.add("block","animate-in", "fade-in", "zoom-in", "duration-1000")
                }

                cb?.()
            })
        }
    },[])
}

export default function LandingClient(){
    const initialized = useRef(false) // required in dev-mode as react's strictmode germinates rendering twice
    const [headerLoaded,setHeaderLoaded] = useState(false)
    Initailize(initialized,() => setHeaderLoaded(true)) // just messing around :P


    const { ref: s1Ref, inView: s1InView } = useInView({
        threshold: 1.0, // fully exposed
      });
    const [onceAnimatedS1Section, setOnceAnimatedS1Section] = useState(false)

    const { ref: s2Ref, inView: s2InView } = useInView({
        threshold: 0.0, // partially exposed
      });

    useEffect(() => {
        if(s1InView)setOnceAnimatedS1Section(true)
    },[s1InView])

    useEffect(() => {
        if(!headerLoaded) return
        const hash = window.location.hash; // Get the hash part of the URL
        if (hash === '#auth') {
            const section = document.getElementById("auth-section")
            section?.scrollIntoView({behavior:'smooth'})
            emptyWindowLocationHash() // after scrolling
        }
      }, [headerLoaded]);

    const { data: session, status: sessionStatus } = useSession();
    return (
        <div className="bg-stone-200 pt-5 pr-2 pl-2 flex flex-col items-center sm:block">
            {headerLoaded ? <StepVisual/> : null}
            <div ref={s1Ref} className={`${s1InView || onceAnimatedS1Section ? 'visible animate-in fade-in duration-1000' : 'invisible'} flex flex-row w-full`}>
                <div className="flex-1 flex justify-center items-center mt-5 sm:mt-0">
                    <Developers/>
                </div>
                <div className="hidden sm:block flex-2">
                    <NextImage alt="astro" width={600} height={600} src={"https://static.vecteezy.com/system/resources/previews/022/996/342/original/space-astronaut-transparent-free-png.png"}/>
                </div>
            </div>
            <div ref={s2Ref} className={`${s2InView ? 'visible duration-1000' : 'invisible'} flex flex-col lg:flex-row w-full mt-5`}>
                <div className={`self-center ${s2InView ? 'animate-in slide-in-from-left duration-1000' : ''} flex-1`}>
                    <NextImage alt="astro2" width={600} height={600} src={"https://static.vecteezy.com/system/resources/previews/022/996/348/original/space-astronaut-transparent-free-png.png"}/>
                </div>
                <div className={`self-center ${s2InView ? 'animate-in slide-in-from-right duration-1000' : ''} md:w-3/4 lg:w-auto flex justify-center items-center mt-5 sm:mt-0`}>
                    <StatisticSection inView={s2InView}/>
                </div>
            </div>
            <div id="auth-section" className="flex flex-col">
                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                <p className={`${workBench.className} text-center text-lg sm:text-4xl text-gray-900 dark:text-white mb-16`}>🔐: Authorizing with reliable providers ✅</p>
                {sessionStatus === 'authenticated' ?
                <IAM name={session.user.name!} imageURL={session!.user.image!} className="mb-20"/>
                : null}
                <div onClick={() => signIn('google')}  className="flex items-center justify-center bg-gray-800">
                    <button className="w-full px-4 py-2 border flex gap-2 border-slate-700 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150 justify-center">
                    <div className={`w-${sessionStatus === 'authenticated' ? '80' : '60'} flex flex-row`}>
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                            <span className={`${workBench.className} flex-1 text-left pl-5`}>Login with {sessionStatus === 'authenticated' ? "another" : null} Google</span>
                        </div>
                    </button>
                </div>
                <div onClick={() => {
                    // Do nothing . . .
                    // Has to wait for the app to be published
                    // Too much paper works have to be submited
                    // signIn('facebook')
                }}  className="flex items-center justify-center bg-gray-800">
                    <button className="w-full px-4 py-2 border flex gap-2 border-slate-700 rounded-lg text-slate-200 hover:border-slate-500 hover:text-slate-300 hover:shadow transition duration-150 justify-center">
                        <div className={`w-${sessionStatus === 'authenticated' ? '80' : '60'} flex flex-row`}>
                            <img className="w-6 h-6" src="https://w7.pngwing.com/pngs/991/568/png-transparent-facebook-logo-computer-icons-facebook-logo-facebook-thumbnail.png" loading="lazy" alt="facebook logo"/>
                            <span className={`${workBench.className} flex-1 text-left pl-5`}>Login with {sessionStatus === 'authenticated' ? "another" : null} Facebook (Disabled)</span>
                        </div>
                    </button>
                </div>

                <NextImage className="self-center" alt="astro3" width={600} height={600} src="https://pngfre.com/wp-content/uploads/Astronaut-4.png"/>
            </div>
        </div>
    )
}