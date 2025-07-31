import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalance } from "../../services/userServices";

interface BalanceState {
  balance: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: null,
  loading: false,
  error: null,
};

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getBalance();
      if (res.status === 0 && res.data) {
        return res.data.balance;
      } else {
        return rejectWithValue(res.message || "Gagal memuat saldo.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Terjadi kesalahan yang tidak diketahui.");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default balanceSlice.reducer;
