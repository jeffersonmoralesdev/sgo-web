export type ActionStatus = "SUCCESS" | "WARNING" | "ERROR" | "UNAUTHORIZED";
export type ActionResponse<T = unknown> = {
    success: boolean;
    data?: T;
    message?: string;
    errors?: { [key: string]: string[] | undefined; } | string;
    status?: ActionStatus;
};