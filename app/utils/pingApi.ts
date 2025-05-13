import axios, { type AxiosResponse } from 'axios';
import { tryCatch, type Result } from "~/utils/tryCatch";

export async function ping(
   bearerToken: string,
): Promise<Result<boolean, Error>> {
    if (!bearerToken || bearerToken.trim() === "") {
        return { data: null, error: new Error("Bearer token is null, empty, or whitespace") }
    }

    const { error } = await tryCatch<AxiosResponse>(
        axios.get('https://api.up.com.au/api/v1/util/ping', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        }));
    
    if (error) {
        return { data: null, error: error }
    }

    return { data: true, error: null }
}