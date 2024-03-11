// /types/next-auth-d.ts
import NextAuth, { DefaultSession,JWT } from 'next-auth';

declare module 'next-auth' {
    interface Session {
      user: {
        accessToken?: string; // Oauth access token
      } & DefaultSession['user'];
    }
    interface JWT extends Record<string, unknown>, DefaultJWT {
      idToken: string; // the openid we manually inject
    }
  }