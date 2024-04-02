'use client'

import { workBench } from "@/utils/font"
import Link from "next/link";
import { KeyboardEvent,useEffect, useMemo, useRef, useState } from "react";
import Typewriter from 'typewriter-effect';

type Instruction = {
    name: string,
    prompt: string
    validations: {message: string, validateFn: (input:string) => boolean}[]
    transform?: (input:string) => any
}

type Props<T> = {
    cliTitle?: string
    onPromptSatisfied: (input: T) => void
    instructions: Instruction[]
}

export default function VirtualCli<T = Record<string,any>>(props: Props<T>){
    const [pastPrompts, setPastPrompts] = useState<Array<string>>([])
    const [currentValidationFailedMsg, setCurrentValidationFailedMsg] = useState<string | null>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [readyResults, setReadyResults] = useState<Record<string,any>>([])
    const [isWaitingForInput, setIsWaitingForInput] = useState(false)
    const [isEnded, setIsEnded] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const instructions = props.instructions

    function onEnterHandler(event:KeyboardEvent){
        if(!inputRef.current) return
        if(!inputRef.current.value) return
        if (event.key !== 'Enter') return
        setCurrentValidationFailedMsg(null) // reset
        const validations = instructions[currentStep].validations
        const input = inputRef.current.value
        for (const validation of validations){
            if(!validation.validateFn(input)){
                return setCurrentValidationFailedMsg(validation.message)
                // console.error(validation.message)
            }
        }

        let transformedInput = input
        const {transform,name} = instructions[currentStep]
        if(transform){
            // if transform method found
            transformedInput = transform(input)
        }

        setPastPrompts(prev => ([
            ...prev,
            transformedInput
        ]))
        if(currentStep === instructions.length-1){
            setIsEnded(true)
            return props.onPromptSatisfied({...readyResults,[name]:transformedInput} as T) // cb yield > not returning state because it is asynchronize so the value here would be obsolete
        }
        setReadyResults(prev => ({
            ...prev,
            [name]: transformedInput
        }))
        setCurrentStep(currentStep+1)
        setIsWaitingForInput(false)
        
    }

    const renderedPastPrompts = useMemo(() => {
        return pastPrompts.map((str,index) => 
            <div key={index} className={`flex flex-row ${workBench.className} text-white`}> 
                <span>{">"}:{str}</span> 
            </div>
        )
    },[pastPrompts])

    useEffect(() => {
        if(isWaitingForInput){
            if(!inputRef.current) return
            inputRef.current.focus();
        }
      }, [isWaitingForInput]);
    
    return <div className="flex flex-col lg:p-20 justify-center justify-items-center w-full h-full animate-in fade-in zoom-in">
    <div className={`bg-gray-800 h-12 rounded-t-lg text-yellow-500 ${workBench.className} flex items-center justify-between`}>
      <span className="ml-5 text-xl">📟 PIOKI Virutal Terminal {props.cliTitle ? `( ${[props.cliTitle]} )` : null}</span>
      <Link href="/vault">
        <span className="mr-4 float-right text-red-600 hover:text-white text-2xl cursor-pointer select-none">X</span>
      </Link>
    </div>
<div className="bg-black p-5 rounded-b-lg w-full h-full">
        {renderedPastPrompts}
        <div className={`w-full ${workBench.className}`}>
            <div className="flex flex-row text-white"> 

                {!isEnded ? 
                
                <>
                    <span>{">"}:</span> 
                        {isWaitingForInput ? 
                            <input ref={inputRef} className="bg-transparent outline-none w-full" onKeyDown={onEnterHandler}/>
                        : 
                        
                        <Typewriter options={{delay:20}} onInit={(typewriter) => {
                            typewriter.typeString(instructions[currentStep].prompt)
                            .callFunction(() => {                        
                                setPastPrompts(prev => ([
                                    ...prev,
                                    instructions[currentStep].prompt
                                ]))

                                setIsWaitingForInput(true)
                            })
                            .start()
                        }}/>
                        }
                </>
                
                : 
                        
                <div className="text-green-500 flex flex-row">
                    <span>{">"}:</span> 
                        <Typewriter options={{strings: ["Processing input . . . . . . . . . . . ."],autoStart: true,loop:true}}/>
                
                </div>
                
                }

                
            </div>
        </div>
        <p className={`text-red-500 ${workBench.className}`}>
            {currentValidationFailedMsg}
        </p>
    </div>

    </div>
}