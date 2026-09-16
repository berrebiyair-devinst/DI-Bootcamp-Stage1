const products = require("./products");

console.log(products);

function findProduct(productName) {
    return products.find(product => product.name === productName);
}

console.log(findProduct("Macbook")); // { name: "Macbook", price: 2000, category: "Computer" }