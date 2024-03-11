import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"
import { redirect } from 'next/navigation'
 

// export function middleware(request: NextRequest) {
//   NextResponse.next();
// }

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // This authorized trigger before <middleware<Func>> Above
        if (
          req.nextUrl.pathname.startsWith('/protected') &&
          token === null
        ) {
          return false
        }
        return true
      }
    }
  }
)


export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }