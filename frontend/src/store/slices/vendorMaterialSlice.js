import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchVenderMaterials = createAsyncThunk(
  "vendormaterials/fetchVenderMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/vendor/vendor_material/");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Error fetching vendor materials",
      );
    }
  },
);

export const createVenderMaterial = createAsyncThunk(
  "vendormaterials/createVenderMaterial",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/vendor/vendor_material/", formData);
      dispatch(fetchVenderMaterials());
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

export const updateVenderMaterial = createAsyncThunk(
  "vendormaterials/updateVenderMaterial",
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put(`/vendor/vendor_material/${id}`, formData);
      dispatch(fetchVenderMaterials());
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

export const deleteVenderMaterial = createAsyncThunk(
  "vendormaterials/deleteVenderMaterial",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.delete(`/vendor/vendor_material/${id}`);
      dispatch(fetchVenderMaterials());
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
export const fetchVenders = createAsyncThunk(
  "vendormaterials/fetchVenders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/vendor/vendor/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchMaterials = createAsyncThunk(
  "vendormaterials/fetchMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/inventory/material/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchUnitOfMeasurements = createAsyncThunk(
  "vendormaterials/fetchUnitOfMeasurements",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/inventory/unit_of_measure/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "vendormaterials/fetchUsers",
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
  "vendormaterials/fetchCompanies",
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
const vendorMaterialSlice = createSlice({
  name: "vendormaterials",
  initialState: {
    vendormaterials: [],
    vendors: [],
    materials: [],
    uoms: [],
    users: [],
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenderMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVenderMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.vendormaterials = action.payload;
      })
      .addCase(fetchVenderMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVenders.fulfilled, (state, action) => {
        state.vendors = action.payload;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(fetchUnitOfMeasurements.fulfilled, (state, action) => {
        state.uoms = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      });
  },
});

export default vendorMaterialSlice.reducer;
