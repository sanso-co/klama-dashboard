import { AxiosError } from "axios";

interface AxiosErrorResponse {
    message: string;
}

export const isAxiosError = (error: unknown): error is AxiosError<AxiosErrorResponse> => {
    return (error as AxiosError).isAxiosError !== undefined;
};
