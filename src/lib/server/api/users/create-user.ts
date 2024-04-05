import 'server-only'
import { PIOKI_Fetch } from '../../fetch'

export function createUser(identifier: string,name:string,pictureURL:string) {
  return PIOKI_Fetch('http://localhost:8080/api/users',{
    headers: {"pioki-identifier":identifier,'content-type': "application/json"},
    body: JSON.stringify({oauth_display_name:name,oauth_profile_picture: pictureURL}),
    method: "POST"
  })
}

export function getUserData(identifier: string){
  return PIOKI_Fetch('http://localhost:8080/api/users/'+identifier,{
    headers: {"pioki-identifier":identifier,'content-type': "application/json"},
    method: "GET"
  })    
}

export function getAllUsers(){
  return PIOKI_Fetch('http://localhost:8080/api/users',{
    headers: {'content-type': "application/json"},
    method: "GET"
  })    
}