import { createSelector } from "@reduxjs/toolkit";

const selectProductsState = (state) => state.products.products;

export const selectAvailableProducts = createSelector(
  [selectProductsState],
  (products) => products.filter((product) => product.available)
);

export const selectProductsByCategory = createSelector(
  [selectProductsState, (state, category) => category],
  (products, category) =>
    category === "All"
      ? products
      : products.filter((product) => product.category === category)
);

export const selectProductsByPrice = createSelector(
  [
    selectProductsState,
    (state, minPrice, maxPrice) => minPrice,
    (state, minPrice, maxPrice) => maxPrice,
  ],
  (products, minPrice, maxPrice) =>
    products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    )
);

export const selectFilteredProducts = createSelector(
  [
    selectProductsState,
    (state, filters) => filters.category,
    (state, filters) => filters.minPrice,
    (state, filters) => filters.maxPrice,
    (state, filters) => filters.availability,
    (state, filters) => filters.sortBy,
  ],
  (products, category, minPrice, maxPrice, availability, sortBy) => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && product.available) ||
        (availability === "Unavailable" && !product.available);

      return matchesCategory && matchesPrice && matchesAvailability;
    });

    result = [...result];

    if (sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "availability") {
      result.sort((a, b) => Number(b.available) - Number(a.available));
    }

    return result;
  }
);