export interface PagedData<T> {
    data: T[];
    links: {
        prev: string;
        next: string;
    };
}