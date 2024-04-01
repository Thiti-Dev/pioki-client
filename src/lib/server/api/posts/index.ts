import { PIOKI_Fetch } from "../../fetch";

export function getUserPosts(identifier: string){
    return PIOKI_Fetch('http://localhost:8080/api/users/'+identifier+'/posts',{
      headers: {"pioki-identifier":identifier,'content-type': "application/json"},
      method: "GET"
    })    
  }

export function checkIfPostOwnedByUser(postID: number){
    return PIOKI_Fetch(`http://localhost:8080/api/posts/${postID}/is_owned`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }

export function keepPost(postID: number){
    return PIOKI_Fetch(`http://localhost:8080/api/posts/${postID}/keep`,{
      headers: {'content-type': "application/json"},
      method: "POST"
    })    
  }