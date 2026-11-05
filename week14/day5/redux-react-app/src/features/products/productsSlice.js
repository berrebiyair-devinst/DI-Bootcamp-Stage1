import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: 1, name: "iPhone", category: "Electronics", price: 900, available: true },
    { id: 2, name: "T-Shirt", category: "Clothing", price: 25, available: true },
    { id: 3, name: "Laptop", category: "Electronics", price: 1200, available: false },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;