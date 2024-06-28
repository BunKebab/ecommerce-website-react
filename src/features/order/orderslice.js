import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:3001/orders";

export const fetchOrderHistory = createAsyncThunk(
  "orders/fetchOrderHistory",
  async (userId) => {
    const response = await fetch(`${URL}?userId=${userId}`);
    const data = await response.json();
    return data;
  }
);

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ user, items, address }) => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, items, address }),
    });

    try {
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    items: [],
    orderHistory: [],
    address: null,
    loading: false,
    error: null,
  },
  reducers: {
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //order history cases
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOrderHistory } = orderSlice.actions;
export default orderSlice.reducer;
