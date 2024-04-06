import { CreatePostBodyDTO } from "@/shared/interfaces/post.interface";
import { PIOKI_Fetch } from "../../fetch";

export function getUserPosts(identifier: string){
    return PIOKI_Fetch('/api/users/'+identifier+'/posts',{
      headers: {"pioki-identifier":identifier,'content-type': "application/json"},
      method: "GET"
    })    
  }

export function checkIfPostOwnedByUser(postID: number){
    return PIOKI_Fetch(`/api/posts/${postID}/is_owned`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }

export function keepPost(postID: number){
    return PIOKI_Fetch(`/api/posts/${postID}/keep`,{
      headers: {'content-type': "application/json"},
      method: "POST"
    })    
  }

export function passPost(postID: number){
  return PIOKI_Fetch(`/api/posts/${postID}/pass`,{
    headers: {'content-type': "application/json"},
    method: "POST"
  })    
}

export function createPost(data: CreatePostBodyDTO){
  return PIOKI_Fetch(`/api/posts`,{
    headers: {'content-type': "application/json"},
    body: JSON.stringify(data),
    method: "POST"
  })    
}