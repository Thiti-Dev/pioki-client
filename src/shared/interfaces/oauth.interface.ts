export interface OAuthData{
    user: {
        id: string // unique-id,
        name: string,
        email: string,
        image: string
    },
    account: {
        provider: 'facebook' | 'google',
        type: 'oauth',
        providerAccountId: string, // same as user.id
        access_token: string
        token_type: 'bearer',
        expires_at: number, // number -> 1715271601
        id_token: string // ocid
    },
    profile: {
        id: string,
        name: string,
        email: string,
        picture: { data: Object }
      }
}