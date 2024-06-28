import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:3001/users";

export const allUsers = createAsyncThunk("users/getAll", async () => {
  const response = await fetch(URL);
  const users = await response.json();

  return users;
});

export const addUser = createAsyncThunk("users/add", async (user) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const updateUser = createAsyncThunk("users/update", async (user) => {
  const response = await fetch(`${URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.payload;
      })

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
