import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password, server }, { rejectWithValue }) => {
    try {
      const requestBody = {
        username,
        password,
        server,
      };

      // console.log("LOGIN REQUEST BODY:", requestBody);
      // console.log("API BASE URL (RUNTIME):", import.meta.env.VITE_API_BASE_URL);

      const response = await api.post("/access/login/", requestBody);

      // console.log("LOGIN RESPONSE:", response.data);

      const { access, refresh, username: uname, position } = response.data;

      Cookies.set("access_token", access, { expires: 1 });
      Cookies.set("refresh_token", refresh, { expires: 1 });
      Cookies.set("username", uname, { expires: 1 });
      Cookies.set("position", position, { expires: 1 });

      return {
        access,
        refresh,
        username: uname,
        position,
      };
    } catch (error) {
      console.error(
        "LOGIN ERROR RESPONSE:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Invalid username, password or server",
      );
    }
  },
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("username");
      Cookies.remove("position");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
