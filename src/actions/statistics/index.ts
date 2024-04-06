'use server'

import { getGeneralStatisticData } from "@/lib/server/api/statistics";
import { PIOKIApiResponse, ServerActionResponse } from "@/shared/interfaces/common.interface";
import { GeneralStatisticData } from "@/shared/interfaces/statistic.interface";


export async function getGeneralStatisticDataServerAction(): Promise<ServerActionResponse<GeneralStatisticData>>{
    const res = await getGeneralStatisticData();
    if(!res.ok) return {ok:false}

    return {ok:true,data: (await res.json() as PIOKIApiResponse<GeneralStatisticData>).data}
}