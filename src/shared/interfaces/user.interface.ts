interface UserData{
    id: number,
    pioki_id: string,
    oauth_display_name: string,
    oauth_profile_picture: string,
    created_at: string,
    updated_at: string,
    coin_amount: string // NUMERIC -> BIGDECIMAL -> INF LENGTH
}

export type {
    UserData
}