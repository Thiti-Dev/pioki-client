import 'server-only'

export function createUser(identifier: string) {
    console.log("hey")
  return fetch('http://localhost:8080/api/users',{
    headers: {"pioki-identifier":identifier},
    method: "POST"
  })
}