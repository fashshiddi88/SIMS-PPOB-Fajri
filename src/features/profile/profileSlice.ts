import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { UserProfile } from "../../types/auth";
import { getProfile } from "../../services/userServices";

interface ProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}

interface ThunkApiConfig {
  rejectValue: string;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk<UserProfile, void, ThunkApiConfig>(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfile();
      return response.data;
    } catch (error) {
      let message = "Gagal mengambil profil";
      if (error instanceof Error) message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
