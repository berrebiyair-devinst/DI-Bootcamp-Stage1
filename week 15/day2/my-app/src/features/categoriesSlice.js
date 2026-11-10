import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "Work" },
    { id: 2, name: "Study" },
    { id: 3, name: "Personal" },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },

    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    editCategory: (state, action) => {
      const { id, name } = action.payload;
      const category = state.categories.find(
        (category) => category.id === id
      );

      if (category) {
        category.name = name;
      }
    },
  },
});

export const {
  addCategory,
  removeCategory,
  editCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;