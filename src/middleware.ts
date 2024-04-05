import { withAuth } from "next-auth/middleware"

const REQUIRE_AUTH_ROUTES = ['/discovery','/vault','/feed','/profile']
 

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
        if(token) return true // if has token, proceed with ease
        const isStumbleOnAuthRequired = REQUIRE_AUTH_ROUTES.every((path) => !req.nextUrl.pathname.startsWith(path))
        return isStumbleOnAuthRequired
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