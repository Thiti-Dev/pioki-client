import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
  ) {
    const token = await getToken({req})
    return Response.json({ message: 'Hello from Next.js!',token: token })
}