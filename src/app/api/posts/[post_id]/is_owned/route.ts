import { checkIfPostOwnedByUser } from "@/lib/server/api/posts"
import { PIOKIApiResponse } from "@/shared/interfaces/common.interface"
import { PostKeeper } from "@/shared/interfaces/post.interface"
import { NextApiRequest } from "next"

export async function GET(
    req: NextApiRequest,
    {params}: {params: {post_id: string}}
  ) {

    const res = await checkIfPostOwnedByUser(parseInt(params.post_id))
    const data = await res.json() as PIOKIApiResponse<PostKeeper | undefined> // it could be absent
    console.log(data)

    return Response.json({ success:true, is_owned: Boolean(data.data) })
}