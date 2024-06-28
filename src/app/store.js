import { configureStore } from "@reduxjs/toolkit";
import productslice from "../features/products/productslice";
import authslice from "../features/auth/authslice";
import cartslice from "../features/cart/cartslice";
import orderslice from "../features/order/orderslice";
import userslice from "../features/users/userslice";

export const store = configureStore({
  reducer: {
    productslice,
    authslice,
    cartslice,
    orderslice,
    userslice
  },
});