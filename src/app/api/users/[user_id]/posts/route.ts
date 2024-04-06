import { getUserPosts } from "@/lib/server/api/posts"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    {params}: {params: {user_id: string}}
  ) {

    const res = await getUserPosts(params.user_id)
    return Response.json({ ...await res.json() })
}