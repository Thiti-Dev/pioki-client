import { listKeptPostIds } from "@/lib/server/api/me"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
  ) {
        const res = await listKeptPostIds()
        try {
            const responseData = await res.json()
            return Response.json(responseData,{status: res.status})
        } catch (error) {
            return Response.json(res.body,{status: res.status})            
        }
}