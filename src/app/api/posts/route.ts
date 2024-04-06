import { createPost } from "@/lib/server/api/posts"
import { CreatePostBodyDTO } from "@/shared/interfaces/post.interface"
import { NextRequest } from "next/server"

export async function POST(
    req: NextRequest
  ) {
    const body = await req.json() as CreatePostBodyDTO // supposed
    const res = await createPost(body)
    try {
        const responseData = await res.json()
        return Response.json(responseData,{status: res.status})
    } catch (error) {
        return Response.json(res.body,{status: res.status})            
    }
}