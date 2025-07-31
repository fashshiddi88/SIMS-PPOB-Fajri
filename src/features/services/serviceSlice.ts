import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServices } from "../../services/userServices";
import type { ServiceItem, ServicesResponse } from "../../types/auth";

interface ServiceState {
  services: ServiceItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk<
  ServiceItem[],
  void,
  { rejectValue: string }
>("services/fetchServices", async (_, { rejectWithValue }) => {
  try {
    const response: ServicesResponse = await getServices();

    if (response.status !== 0) {
      return rejectWithValue(response.message);
    }

    return response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Terjadi kesalahan tidak diketahui");
  }
});

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal memuat layanan";
      });
  },
});

export default serviceSlice.reducer;
