import 'server-only'
import { PIOKI_Fetch } from '../../fetch'

export function createUser(identifier: string) {
  return PIOKI_Fetch('http://localhost:8080/api/users',{
    headers: {"pioki-identifier":identifier},
    method: "POST"
  })
}