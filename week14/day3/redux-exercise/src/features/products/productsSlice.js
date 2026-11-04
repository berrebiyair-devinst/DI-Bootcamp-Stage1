import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    productsList:[],
    selectedProduct:null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productsList.push(action.payload);
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  }
});

export const { addProduct, selectProduct } = productsSlice.actions;
export default productsSlice.reducer;