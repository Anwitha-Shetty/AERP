import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

/* ================= USERS CRUD ================= */
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/user/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching users");
    }
  },
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/people/user/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        data: res.data,
        status: res.status,
      };
    } catch (err) {
      return rejectWithValue({
        data: err.response?.data,
        status: err.response?.status,
      });
    }
  },
);

/* ================= FK DROPDOWNS ================= */
export const fetchCompanies = createAsyncThunk(
  "users/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/company/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchUserTypes = createAsyncThunk(
  "users/fetchUserTypes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/user_type/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchPositions = createAsyncThunk(
  "users/fetchPositions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/position/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchUserStatus = createAsyncThunk(
  "users/fetchUserStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/user_status/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    companies: [],
    userTypes: [],
    positions: [],
    statuses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= CREATE USER ================= */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.data);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH DATA ================= */
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addCase(fetchUserTypes.fulfilled, (state, action) => {
        state.userTypes = action.payload;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.positions = action.payload;
      })
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.statuses = action.payload;
      });
  },
});

export default userSlice.reducer;
