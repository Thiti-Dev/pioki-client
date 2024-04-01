import { listKeptPosts } from "@/lib/server/api/me"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextApiRequest } from "next"

export async function GET(
    req: NextApiRequest,
  ) {
        const res = await listKeptPosts()
        try {
            const responseData = await res.json()
            return Response.json(responseData,{status: res.status})
        } catch (error) {
            return Response.json(res.body,{status: res.status})            
        }
}