import { keepPost } from "@/lib/server/api/posts"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextRequest } from "next/server"

export async function POST(
    req: NextRequest,
    {params}: {params: {post_id: string}}
  ) {

    const res = await keepPost(parseInt(params.post_id))
    return Response.json({ ...await res.json()},{status:res.status})
}