import { PIOKI_Fetch } from "../../fetch";

export function listKeptPostIds(){
    return PIOKI_Fetch(`/api/me/kept_post_ids`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }

export function listKeptPosts(){
  return PIOKI_Fetch(`/api/me/kept_posts`,{
    headers: {'content-type': "application/json"},
    method: "GET"
  })    
}

export function checkRelationshipStatus(targetUserID: string){
  return PIOKI_Fetch(`/api/me/relationship_status/${targetUserID}`,{
    headers: {'content-type': "application/json"},
    method: "GET"
  })    
}

export function getPostFeeds(){
  return PIOKI_Fetch('/api/me/feeds',{
      headers: {'content-type': "application/json"},
      method: "GET"
  })    
}