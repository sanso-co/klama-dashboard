export interface LoginResponseType {
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
}

export interface LoginType {
    username: string;
    password: string;
}
