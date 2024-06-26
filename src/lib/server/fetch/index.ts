import "server-only"
import type { NaiveFetchParameter } from "./types";
import { getServerSession } from "next-auth";
import { authOptions } from "../next-auth";

export async function PIOKI_Fetch(...args: NaiveFetchParameter){
    const session = await getServerSession(authOptions) // authOptions required to see additional data added in callback
    args[0] = `${process.env.PIOKI_SERVICE_ENDPOINT}${args[0]}`
    if(!args[1]) args[1] = {} as RequestInit;
    const header = args[1];
    (args[1].headers as unknown as any)["pioki-access-key"] = process.env.PIOKI_SERVICE_ACCESS_KEY;
    // Supportation for crate_user case where session id isn't initialized yet so it instead manually specify the identifier
    if(!header.hasOwnProperty("pioki-identifier") && session){
        (args[1].headers as unknown as any)["pioki-identifier"]  = session.user.id
    }

    return fetch(...args)
}