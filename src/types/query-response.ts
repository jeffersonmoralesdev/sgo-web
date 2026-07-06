export type QueryStatus = "SUCCESS" | "ERROR";

export type QueryResponse<T = unknown> = | {
    success: true;
    status: "SUCCESS";
    data: T;
    message?: string;
} | {
    success: false;
    status: "ERROR";
    error: string;
    message?: string;
    data?: undefined;
};