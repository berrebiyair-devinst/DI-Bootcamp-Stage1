CREATE DATABASE "Public";

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

INSERT INTO items (item_name, price)
VALUES
    ('Small Desk', 100),
    ('Large Desk', 300),
    ('Fan', 80);

INSERT INTO customers (first_name, last_name)
VALUES
    ('Greg', 'Jones'),
    ('Sandra', 'Jones'),
    ('Scott', 'Scott'),
    ('Trevor', 'Green'),
    ('Melanie', 'Johnson');

SELECT *
FROM items;

SELECT *
FROM items
WHERE price > 80;

SELECT *
FROM items
WHERE price <= 300;

SELECT *
FROM customers
WHERE last_name = 'Smith';

SELECT *
FROM customers
WHERE last_name = 'Jones';

SELECT *
FROM customers
WHERE first_name != 'Scott';

SELECT *
FROM items
ORDER BY price ASC;

SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

SELECT last_name
FROM customers
ORDER BY last_name DESC;
