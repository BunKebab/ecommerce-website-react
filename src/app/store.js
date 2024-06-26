import { configureStore } from "@reduxjs/toolkit";
import productslice from "../features/products/productslice";

export const store = configureStore({
  reducer: {
    productslice,
  },
});