'use client'
import VirtualCli from "@/components/common/virtual-cli";
import { CreatePostBodyDTO } from "@/shared/interfaces/post.interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type VirtualCLIInput = {
    title:string;
    content:string;
    quota:number;
}

export default function CreatePost(){
    const route = useRouter()
    const { data: session, status: sessionStatus } = useSession();

    async function onProceedToCreatePostHandler(input: VirtualCLIInput){
        const res = await fetch("/api/posts",{method:'POST',body:  JSON.stringify({
            content:input.content,
            quota_limit: input.quota,
            spoiler_header: input.title
        } as CreatePostBodyDTO)   })
        if(!res.ok) return // indicate error

        route.push("/profile/"+session?.user.id)
    }

    return <>
        <VirtualCli<VirtualCLIInput> onPromptSatisfied={onProceedToCreatePostHandler} instructions={[
        {
            name: "title",
            prompt:"What would be your title",
            validations: [
                {message: "Should have at least 3 character",validateFn: (input:string) => input.length >= 3 }
            ]
        },
        {
            name: "content",
            prompt:"What would be your secret message",
            validations: [
                {message: "Should have at least 10 character",validateFn: (input:string) => input.length >= 10 }
            ]
        },
        {
            name: "quota",
            prompt:"Enter the total amount of copies do you want for your message",
            validations: [
                {message: "Should be number",validateFn: (input:string) => Number.isInteger(parseInt(input)) },
                {message: "Should more than 0",validateFn: (input:string) => parseInt(input) > 0 }
            ],
            transform: (input) => parseInt(input),
        }
    ]}/>
    </>
}