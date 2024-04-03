interface PendingFriend{
    id: number;
    pioki_id: string;
    oauth_display_name: string;
    oauth_profile_picture: string;
    requested_at: string;
    coin_owned: string;
}

type Friend = Omit<PendingFriend,'requested_at'> //& {coin_owned:string} // big decimal

type RelationshipStatus = 'requested' | 'pending' | 'none' | 'friended'

export type {
    PendingFriend,
    Friend,
    RelationshipStatus
}