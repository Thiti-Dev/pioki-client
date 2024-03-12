import { NaiveFetchParameter } from "./types"

const naiveFetch = globalThis.fetch // keep the native one

// Monkey patching method
// For nextjs it doesn't work, as it strictly inhibit modifying globalThis properties
// I will go for a wrapper function instead
export function register(){
    globalThis.fetch = function(...args: NaiveFetchParameter){
        return naiveFetch(...args)
    }
}

export function unregister(){
    globalThis.fetch = naiveFetch
}