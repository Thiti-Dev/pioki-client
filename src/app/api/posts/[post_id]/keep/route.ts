import { keepPost } from "@/lib/server/api/posts"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextApiRequest } from "next"

export async function POST(
    req: NextApiRequest,
    {params}: {params: {post_id: string}}
  ) {

    const res = await keepPost(parseInt(params.post_id))
    return Response.json({ ...await res.json()},{status:res.status})
}