import { getFriendList } from "@/lib/server/api/friends"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    {params}: {params: {user_id: string}}
  ) {
        const res = await getFriendList(params.user_id)
        try {
            const responseData = await res.json()
            return Response.json(responseData,{status: res.status})
        } catch (error) {
            return Response.json(res.body,{status: res.status})            
        }
}