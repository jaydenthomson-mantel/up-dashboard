import type { PagedData } from "~/utils/pagedData";
import type { Account } from "./account";
import axios, { type AxiosResponse } from 'axios';
import { tryCatch, type Result } from "~/utils/tryCatch";
import { validateAccessToken } from "../sign-in/signInSlice";

export async function getAccounts(
    accessToken: string,
): Promise<Result<PagedData<Account>, Error>> {
    const { error, errorReason } = validateAccessToken(accessToken)
    if (error) {
        return { data: null, error: new Error(errorReason) }
    }

    const { data, error: apiError } = await tryCatch<AxiosResponse<PagedData<Account>>>(
        axios.get('https://api.up.com.au/api/v1/accounts', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }));

    if (apiError) {
        return { data: null, error: apiError }
    }

    return { data: data.data, error: null }
}

export async function getNextAccounts(
    nextPageUrl: string,
    accessToken: string,
): Promise<Result<PagedData<Account>, Error>> {
    const { error, errorReason } = validateAccessToken(accessToken)
    if (error) {
        return { data: null, error: new Error(errorReason) }
    }

    const { data, error: apiError } = await tryCatch<AxiosResponse<PagedData<Account>>>(
        axios.get(nextPageUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }));

    if (apiError) {
        return { data: null, error: apiError }
    }

    return { data: data.data, error: null }
}