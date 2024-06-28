import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "http://localhost:3001/products";

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const updateProduct = createAsyncThunk("products/update", async (product) => {
  const response = await fetch(`${URL}/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (productId) => {
  const response = await fetch(`${URL}/${productId}`);
  const product = await response.json();
  return product;
});

export const productData = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    loading: false,
    error: null,
    data: [],
    product: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(productData.pending, (state) => {
        state.loading = true;
      })
      .addCase(productData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(productData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
