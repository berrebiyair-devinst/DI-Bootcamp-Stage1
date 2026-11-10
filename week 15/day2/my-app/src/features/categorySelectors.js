import { createSelector } from "@reduxjs/toolkit";

export const selectCategories = (state) =>
  state.categories.categories;

export const selectCategoryById = createSelector(
  [
    selectCategories,
    (state, categoryId) => categoryId,
  ],
  (categories, categoryId) =>
    categories.find((category) => category.id === categoryId)
);