export type QueryStatus = "SUCCESS" | "ERROR" ;

export type QueryResponse<T = unknown> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    status: QueryStatus;
};