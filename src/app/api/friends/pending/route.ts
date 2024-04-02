import { getPendingFriendList } from "@/lib/server/api/friends"
import { NextApiRequest } from "next"

export async function GET(
    req: NextApiRequest,
  ) {
        const res = await getPendingFriendList()
        try {
            const responseData = await res.json()
            return Response.json(responseData,{status: res.status})
        } catch (error) {
            return Response.json(res.body,{status: res.status})            
        }
}