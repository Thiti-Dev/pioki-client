import { getPendingFriendList } from "@/lib/server/api/friends"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
  ) {
        const res = await getPendingFriendList()
        try {
            const responseData = await res.json()
            return Response.json(responseData,{status: res.status})
        } catch (error) {
            return Response.json(res.body,{status: res.status})            
        }
}