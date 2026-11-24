
import axiosInstance from "./api/axiosInstance";
import tokenManager from "./tokenManager";

export interface LoginRequest {
    loginId: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
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

    // Login
    async login(credentials: LoginRequest): Promise<LoginResponse> {

        const response = await axiosInstance.post<LoginResponse>(
            "/auth/login",
            credentials,
            {
                withCredentials: true,
            }
        );

        const data = response.data;

        tokenManager.setAccessToken(data.accessToken);

        return data;
    },

    // Logout
    async logout(): Promise<void> {

        try {
            await axiosInstance.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
        } finally {
            // Clear access token from frontend memory
            tokenManager.clearTokens();
        }
    },

    // Register
    async register(data: RegisterRequest) {

        const response = await axiosInstance.post(
            "/auth/public/register",
            data
        );

        return response.data;
    },
};
