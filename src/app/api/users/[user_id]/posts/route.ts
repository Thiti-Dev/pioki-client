import { getUserPosts } from "@/lib/server/api/posts"
import { NextApiRequest } from "next"

export async function GET(
    req: NextApiRequest,
    {params}: {params: {user_id: string}}
  ) {

    const res = await getUserPosts(params.user_id)
    return Response.json({ ...await res.json() })
}