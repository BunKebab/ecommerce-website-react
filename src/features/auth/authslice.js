import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:3001/users";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }) => {
    const response = await fetch(
      `${URL}?email=${email}&password=${password}`
    );
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    const user = await response.json();
    return user[0]
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Update isAuthenticated in state
        state.user = action.payload; // Update user in state
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false; // Update isAuthenticated in state
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions
export default authSlice.reducer;
