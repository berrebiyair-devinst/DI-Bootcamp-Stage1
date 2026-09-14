"use strict";
function handleData(data) {
    return data.map((item) => {
        if (item.type === "user") {
            return `Welcome ${item.name}, you are ${item.age} years old`;
        }
        if (item.type === "product") {
            return `Product ID: ${item.id}, Price: $${item.price}`;
        }
        if (item.type === "order") {
            return `Order ID: ${item.orderId}, Amount: $${item.amount}`;
        }
        return "Unknown data type";
    });
}
const data = [
    {
        type: "user",
        name: "Yair",
        age: 22
    },
    {
        type: "product",
        id: 101,
        price: 999
    },
    {
        type: "order",
        orderId: "ORD-001",
        amount: 1500
    }
];
console.log(handleData(data));
