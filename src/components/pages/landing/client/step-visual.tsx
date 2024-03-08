'use client'

import { workBench } from "@/utils/font"
import { useEffect, useRef, useState } from "react"

export default function StepVisual(){
    const [step,setStep] = useState(0)
    const stepInterval = useRef<null|NodeJS.Timeout>(null)
    useEffect(() => {
        stepInterval.current = setInterval(() => {
            setStep((step+1)%3)
        },1500)

        return () => {
            if(stepInterval.current) clearInterval(stepInterval.current)
        }
    },[step])

    function getSupposeColorToBeRendered(i: number){
        if(step === i) return 'blue'
        return 'gray'
    }


    return <ol className={`${workBench.className} animate-in slide-in-from-left duration-1000 md:p-4 md:text-3xl lg:text-4xl items-center sm:w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse justify-center relative`}>
    <li className={`flex items-center text-${getSupposeColorToBeRendered(0)}-600 dark:text-${getSupposeColorToBeRendered(0)}-500 space-x-2.5 rtl:space-x-reverse`}>
        <span className={`flex items-center justify-center w-12 h-12 border border-${getSupposeColorToBeRendered(0)}-500 rounded-full shrink-0 dark:border-${getSupposeColorToBeRendered(0)}-500`}>
            1
        </span>
        <span>
            <h3 className="font-medium leading-tight">Share something</h3>
            <p className="sm:hidden md:block text-sm">with quota constraint, your choice</p>
        </span>
    </li>
    <li className={`flex items-center text-${getSupposeColorToBeRendered(1)}-600 dark:text-${getSupposeColorToBeRendered(1)}-500 space-x-2.5 rtl:space-x-reverse`}>
        <span className={`flex items-center justify-center w-12 h-12 border border-${getSupposeColorToBeRendered(1)}-500 rounded-full shrink-0 dark:border-${getSupposeColorToBeRendered(1)}-500`}>
            2
        </span>
        <span>
            <h3 className="font-medium leading-tight">Let em go</h3>
            <p className="sm:hidden md:block text-sm">It may be stuck at someone or be passing along</p>
        </span>
    </li>
    <li className={`flex items-center text-${getSupposeColorToBeRendered(2)}-600 dark:text-${getSupposeColorToBeRendered(2)}-500 space-x-2.5 rtl:space-x-reverse`}>
        <span className={`flex items-center justify-center w-12 h-12 border border-${getSupposeColorToBeRendered(2)}-500 rounded-full shrink-0 dark:border-${getSupposeColorToBeRendered(2)}-500`}>
            3
        </span>
        <span>
            <h3 className="font-medium leading-tight">Earns point</h3>
            <p className="sm:hidden md:block text-sm">Earn reward based on engagement</p>
        </span>
    </li>
</ol>
}