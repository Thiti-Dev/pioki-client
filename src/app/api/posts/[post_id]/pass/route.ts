import { passPost } from "@/lib/server/api/posts"
import { NextApiRequest } from "next"

export async function POST(
    req: NextApiRequest,
    {params}: {params: {post_id: string}}
  ) {

    const res = await passPost(parseInt(params.post_id))
    try {
        const responseData = await res.json()
        return Response.json(responseData,{status: res.status})
    } catch (error) {
        return Response.json(res.body,{status: res.status})            
    }
}