import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:3000";

// Login thunk
export const login = createAsyncThunk(
    "auth/login",
    async (credentials) => {
        const response = await axios.post(`${baseURL}/api/auth/login`, credentials, { withCredentials: true });
        return response.data;
    }
);

// Register thunk
export const register = createAsyncThunk(
    "auth/register",
    async (credentials) => {
        const response = await axios.post(`${baseURL}/api/auth/register`, credentials, { withCredentials: true });
        return response.data;
    }
);

// Logout thunk
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        const response = await axios.post(`${baseURL}/api/auth/logout`, {}, { withCredentials: true });
        return response.data;
    }
);

// Load user thunk (session restore)
export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async () => {
        const response = await axios.get(`${baseURL}/api/auth/me`, { withCredentials: true });
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        resetAuthError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.error.message;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.error.message;
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Load user
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.error.message;
            });
    }
});

export const { resetAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;