import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

/* ================= COMPANIES CRUD ================= */
export const fetchCurriences = createAsyncThunk(
  "currencies/fetchCurriences",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/currency/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching curriences");
    }
  },
);

export const createCurrency = createAsyncThunk(
  "currencies/createCurrency",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/people/currency/", formData);
      dispatch(fetchCompanies());
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

export const updateCurrency = createAsyncThunk(
  "currencies/updateCurrency",
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put(`/people/currency/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(fetchCurriences());
      return {
        id,
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

export const deleteCurrency = createAsyncThunk(
  "currencies/deleteCurrency",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.delete(`/people/currency/${id}`);
      dispatch(fetchCurriences());
      return {
        id,
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
export const fetchUsers = createAsyncThunk(
  "currencies/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/user/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchCompanies = createAsyncThunk(
  "currencies/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/people/company/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

/* ================= SLICE ================= */
const currencySlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
    users: [],
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurriences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurriences.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurriences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      });
  },
});

export default currencySlice.reducer;
