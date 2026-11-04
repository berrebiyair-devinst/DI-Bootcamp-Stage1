import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    counter: counterReducer
  }
});