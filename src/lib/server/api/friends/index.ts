import { PIOKI_Fetch } from "../../fetch";

export function getFriendList(userID:string){
    return PIOKI_Fetch(`http://localhost:8080/api/users/${userID}/friends`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }

export function getPendingFriendList(){
return PIOKI_Fetch('http://localhost:8080/api/friends/pending',{
    headers: {'content-type': "application/json"},
    method: "GET"
})    
}

export function sendFriendRequest(targetUserID:string){
  return PIOKI_Fetch(`http://localhost:8080/api/users/${targetUserID}/send-friend-request`,{
      headers: {'content-type': "application/json"},
      method: "POST"
  })    
  }