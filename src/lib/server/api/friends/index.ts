import { PIOKI_Fetch } from "../../fetch";

export function getFriendList(userID:string){
    return PIOKI_Fetch(`/api/users/${userID}/friends`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }

export function getPendingFriendList(){
return PIOKI_Fetch('/api/friends/pending',{
    headers: {'content-type': "application/json"},
    method: "GET"
})    
}

export function sendFriendRequest(targetUserID:string){
  return PIOKI_Fetch(`/api/users/${targetUserID}/send-friend-request`,{
      headers: {'content-type': "application/json"},
      method: "POST"
  })    
  }

  export function removeFriend(targetUserID:string){ // can also be used to decline the requested made or pending request
    return PIOKI_Fetch(`/api/users/${targetUserID}/remove-friend`,{
        headers: {'content-type': "application/json"},
        method: "POST"
    })    
    }