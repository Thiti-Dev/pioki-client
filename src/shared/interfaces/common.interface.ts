type PIOKIApiResponse<T = never> = T extends never ? { message: string } : { message: string, data: T };
interface SuccessServerActionResponse<T>{
    ok: true,
    data: T
}
interface FailedServerActionResponse{
    ok: false,
}

type ServerActionResponse<T=any> = SuccessServerActionResponse<T> | FailedServerActionResponse
export type {
    PIOKIApiResponse,
    ServerActionResponse
}