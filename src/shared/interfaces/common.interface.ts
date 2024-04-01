type PIOKIApiResponse<T = never> = T extends never ? { message: string } : { message: string, data: T };

export type {
    PIOKIApiResponse
}