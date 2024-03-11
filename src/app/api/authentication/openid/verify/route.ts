import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function GET(
    req: NextApiRequest,
  ) {
    const token = await getToken({req})
    return Response.json({ message: 'Hello from Next.js!',token: token })
}