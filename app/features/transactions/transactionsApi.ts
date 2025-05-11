import type { PagedData } from "~/utils/pagedData";
import type { Transaction } from "./transaction";
import axios, { type AxiosResponse } from 'axios';
import { tryCatch, type Result } from "~/utils/tryCatch";

export async function getTransactions(
    pageSize: number,
    bearerToken: string,
): Promise<Result<PagedData<Transaction>, Error>> {
    if (!Number.isInteger(pageSize)) {
        return { data: null, error: new Error("Page size not an integer") }
    }

    if (!bearerToken || bearerToken.trim() === "") {
        return { data: null, error: new Error("Bearer token is null, empty, or whitespace") }
    }

    const { data, error } = await tryCatch<AxiosResponse<PagedData<Transaction>>>(
        axios.get('https://api.up.com.au/api/v1/transactions', {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
            params: {
                'page[size]': pageSize,
            },
        }));

    if (error) {
        return { data: null, error: error }
    }

    return { data: data.data, error: null }
}