import { getFriendList } from "@/lib/server/api/friends"
import { NextApiRequest } from "next"

export async function GET(
    req: NextApiRequest,
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