import { checkIfPostOwnedByUser } from "@/lib/server/api/posts"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextRequest } from "next/server"

export async function GET(
    req: NextRequest,
    {params}: {params: {post_id: string}}
  ) {

    const res = await checkIfPostOwnedByUser(parseInt(params.post_id))
    const data = await res.json() as PIOKIApiResponse<PostKeeper | undefined> // it could be absent
    console.log(data)

    return Response.json({ success:true, is_owned: Boolean(data.data) })
}