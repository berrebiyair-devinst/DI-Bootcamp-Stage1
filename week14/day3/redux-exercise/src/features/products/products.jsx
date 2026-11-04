import { useDispatch } from "react-redux";
import { addProduct, selectProduct } from "./productsSlice";
import { useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(
    (state)=> state.products.productsList);
  const selectedProduct = useSelector(
    (state)=> state.products.selectedProduct);

   const handleAddProduct =() => {
    const newProduct ={
        id: crypto.randomUUID(),
        name: "New Product",
        price: 19.99,
    };

    dispatch(addProduct(newProduct));
   }
   return (
  
    <div>
        <h2>Products</h2>
        <button onClick={handleAddProduct}>Add Product</button>
        <h3>Products List:</h3>

          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
                <button onClick={() => dispatch(selectProduct(product))}>Select</button>
                {selectedProduct && selectedProduct.id === product.id && (
                  <p className="selected">Selected!</p>
                )}
            </div>
          ))}
        

    </div>
   
   )
    };

    export default Products;
   
   