import { useSelector } from "react-redux";
import { selectCategories } from "../features/categorySelectors";

function CategorySelector({ selectedCategory, setSelectedCategory }) {
  const categories = useSelector(selectCategories);

  return (
    <div>
      <h3>Filter by Category</h3>

      <select
        value={selectedCategory}
        onChange={(e) => {
          const value = e.target.value;

          setSelectedCategory(
            value === "All" ? "All" : Number(value)
          );
        }}
      >
        <option value="All">All Categories</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelector;