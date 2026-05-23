export type ActionResponse<T = null> = {
    success: boolean;
    data?: T;
    message?: string;
    errors?:{ [key: string]: string[] | undefined;} | string;
};