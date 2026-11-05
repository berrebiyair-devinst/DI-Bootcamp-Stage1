import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../features/products/productsSelectors";

export const ProductList = () => {
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const products = useSelector((state) =>
    selectFilteredProducts(state, {
      category,
      minPrice,
      maxPrice,
      availability,
      sortBy,
    })
  );

  return (
    <div>
      <h2>Product List</h2>

      <label>Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <br /><br />

      <label>Min Price: </label>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />

      <label> Max Price: </label>
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      <br /><br />

      <label>Availability: </label>
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>

      <br /><br />

      <label>Sort By: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="name">Name</option>
        <option value="availability">Availability</option>
      </select>

      <hr />

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Available: {product.available ? "Yes" : "No"}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};