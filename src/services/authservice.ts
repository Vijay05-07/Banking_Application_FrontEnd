import axiosInstance from "./api/axiosInstance";
import tokenManager from "./tokenManager";

export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
}

export const authService = {

    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>(
            "/auth/login",
            credentials
        );

        const data = response.data;
        tokenManager.setTokens(
            data.accessToken,
            data.refreshToken
        );

        return data;
    },



    logout(): void {
        tokenManager.clearTokens();
    },

    async register(data: RegisterRequest) {
    const response = await axiosInstance.post(
        "auth/public/register",
        data
    );

    return response.data;
},
};