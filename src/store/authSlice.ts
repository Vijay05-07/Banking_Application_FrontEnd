import{ createSlice, type PayloadAction } from "@reduxjs/toolkit";
import tokenManager from "../services/tokenManager";

interface authUser{
    id?: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

interface authState {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: authUser | null;
}

const initialState: authState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState, 
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            state.isInitialized = true;
        },
        authCheckCompleted: (state) => {
            state.isInitialized = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isInitialized = true;
            state.user = null;
            tokenManager.clearTokens(); 
        }
    },
});

export const {setAuthenticated, authCheckCompleted, logout } = authSlice.actions;

export default authSlice.reducer;