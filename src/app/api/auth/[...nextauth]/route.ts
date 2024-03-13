import { createUser } from "@/lib/server/api/users/create-user"
import { OAuthData } from "@/shared/interfaces/oauth.interface"
import NextAuth, { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
export const authOptions:AuthOptions = {
  pages:{
    signIn:"/#auth" // custom sign-in required redirection upon authorized callback in `middleware.ts` got false
  },
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      idToken:true,
      issuer: "https://www.facebook.com",
      authorization: {
        params: {
          scope: 'openid',
        },
      },
      jwks_endpoint: "https://www.facebook.com/.well-known/oauth/openid/jwks/"
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      idToken:true,
    }),
  ],
  callbacks: {
    async signIn(data) {
      const oauthData = data as OAuthData; // casted for explicit known type
      const createdUser = await createUser(oauthData.user.id,oauthData.user.name)
      if(createdUser.status !== 201 && createdUser.status !== 409) return false // 201 means created and 409 for already exist, as we don't have the ability to check whether this user is signing up for first time or not, and for the sake of safety where the registered data disappeared at somepoint (looks expensive but not that expensive)
      return true;
    },
    async session({ session, token, user } : any) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt(data:any) {
      const { token, user, account, profile, isNewUser } = data
      // this happen before session
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token
      }
      return token;
    },
  },
}
const handler = NextAuth(authOptions)
export {
  handler as GET, handler as POST
}