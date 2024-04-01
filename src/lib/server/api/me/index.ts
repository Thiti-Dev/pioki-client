import { PIOKI_Fetch } from "../../fetch";

export function listKeptPostIds(){
    return PIOKI_Fetch(`http://localhost:8080/api/me/kept_post_ids`,{
      headers: {'content-type': "application/json"},
      method: "GET"
    })    
  }