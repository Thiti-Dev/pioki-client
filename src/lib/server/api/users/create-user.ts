import 'server-only'
import { PIOKI_Fetch } from '../../fetch'

export function createUser(identifier: string,name:string) {
  return PIOKI_Fetch('http://localhost:8080/api/users',{
    headers: {"pioki-identifier":identifier,'content-type': "application/json"},
    body: JSON.stringify({oauth_display_name:name}),
    method: "POST"
  })
}