import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { showToast } from "../../utils/toast";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Initial state
const initialState = {
  user: user || null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error) {
      showToast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
  showToast.success("Logged out successfully");
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      authService.logout();
      showToast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = "Login successful";
        showToast.success("Login successful");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { resetAuthState, logoutUser } = authSlice.actions;
export default authSlice.reducer;
