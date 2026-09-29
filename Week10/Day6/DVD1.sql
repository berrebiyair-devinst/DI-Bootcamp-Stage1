-- EXERCISE 1

-- 1. Get all languages

SELECT *
FROM language;


-- 2. Get all films with their language

SELECT
    film.title,
    film.description,
    language.name AS language_name
FROM film
INNER JOIN language
    ON film.language_id = language.language_id;


-- 3. Get all languages, including languages without films

SELECT
    film.title,
    film.description,
    language.name AS language_name
FROM language
LEFT JOIN film
    ON language.language_id = film.language_id;


-- 4. Create the new_film table

CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


-- Add new films

INSERT INTO new_film (name)
VALUES
    ('The Dark Knight'),
    ('Inception'),
    ('Interstellar');


-- Display the new films

SELECT *
FROM new_film;


-- 5. Create the customer_review table

CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update DATE DEFAULT CURRENT_DATE,

    FOREIGN KEY (film_id)
        REFERENCES new_film(id)
        ON DELETE CASCADE,

    FOREIGN KEY (language_id)
        REFERENCES language(language_id)
);


-- 6. Add two valid reviews

INSERT INTO customer_review (
    film_id,
    language_id,
    title,
    score,
    review_text,
    last_update
)
VALUES
(
    (SELECT id FROM new_film WHERE name = 'Inception'),
    (SELECT language_id FROM language WHERE name = 'English'),
    'Amazing movie',
    9,
    'The story and the visual effects are excellent.',
    CURRENT_DATE
),
(
    (SELECT id FROM new_film WHERE name = 'Interstellar'),
    (SELECT language_id FROM language WHERE name = 'French'),
    'Excellent science fiction movie',
    10,
    'A beautiful movie with an emotional story.',
    CURRENT_DATE
);


-- Display the reviews

SELECT *
FROM customer_review;


-- 7. Delete a film that has a review

DELETE FROM new_film
WHERE name = 'Inception';


-- Check the reviews after deleting the film

SELECT *
FROM customer_review;

/*
The review linked to Inception is automatically deleted
because the foreign key uses ON DELETE CASCADE.
*/


-- EXERCISE 2

-- 1. Update the language of some films

UPDATE film
SET language_id = (
    SELECT language_id
    FROM language
    WHERE name = 'French'
)
WHERE film_id IN (1, 2, 3)
RETURNING film_id, title, language_id;


-- Display the films with their new language

SELECT
    film.film_id,
    film.title,
    language.name AS language_name
FROM film
INNER JOIN language
    ON film.language_id = language.language_id
WHERE film.film_id IN (1, 2, 3);


/*
2. Foreign keys in the customer table:

customer.address_id references address.address_id
customer.store_id references store.store_id

When inserting a customer, the address_id and store_id
must already exist in their respective tables.
*/


-- Display the foreign keys of the customer table
SELECT
    tc.constraint_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
INNER JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.constraint_schema = kcu.constraint_schema
INNER JOIN information_schema.constraint_column_usage AS ccu
    ON tc.constraint_name = ccu.constraint_name
    AND tc.constraint_schema = ccu.constraint_schema
WHERE tc.table_name = 'customer'
  AND tc.constraint_type = 'FOREIGN KEY';


-- 3. Delete the customer_review table

DROP TABLE IF EXISTS customer_review;

/*
This operation is simple because customer_review is the child table.
Deleting it does not delete new_film or language.
*/


-- 4. Count rentals that have not been returned

SELECT COUNT(*) AS ongoing_rentals
FROM rental
WHERE return_date IS NULL;


-- 5. Find the 30 most expensive films currently not returned

SELECT DISTINCT
    film.film_id,
    film.title,
    film.replacement_cost
FROM film
INNER JOIN inventory
    ON film.film_id = inventory.film_id
INNER JOIN rental
    ON inventory.inventory_id = rental.inventory_id
WHERE rental.return_date IS NULL
ORDER BY film.replacement_cost DESC
LIMIT 30;


-- 6.1 Film about a sumo wrestler with Penelope Monroe

SELECT DISTINCT
    film.film_id,
    film.title,
    film.description
FROM film
INNER JOIN film_actor
    ON film.film_id = film_actor.film_id
INNER JOIN actor
    ON film_actor.actor_id = actor.actor_id
WHERE film.description ILIKE '%sumo%'
  AND actor.first_name = 'Penelope'
  AND actor.last_name = 'Monroe';


-- 6.2 Short documentary, less than one hour, rated R

SELECT
    film_id,
    title,
    description,
    length,
    rating
FROM film
WHERE description ILIKE '%documentary%'
  AND length < 60
  AND rating = 'R';


-- 6.3 Film rented by Matthew Mahan

SELECT DISTINCT
    film.film_id,
    film.title,
    payment.amount,
    rental.rental_date,
    rental.return_date
FROM customer
INNER JOIN rental
    ON customer.customer_id = rental.customer_id
INNER JOIN payment
    ON rental.rental_id = payment.rental_id
INNER JOIN inventory
    ON rental.inventory_id = inventory.inventory_id
INNER JOIN film
    ON inventory.film_id = film.film_id
WHERE customer.first_name = 'Matthew'
  AND customer.last_name = 'Mahan'
  AND payment.amount > 4
  AND rental.return_date >= '2005-07-28'
  AND rental.return_date < '2005-08-02';


-- 6.4 Film watched by Matthew Mahan containing the word boat

SELECT DISTINCT
    film.film_id,
    film.title,
    film.description,
    film.replacement_cost
FROM customer
INNER JOIN rental
    ON customer.customer_id = rental.customer_id
INNER JOIN inventory
    ON rental.inventory_id = inventory.inventory_id
INNER JOIN film
    ON inventory.film_id = film.film_id
WHERE customer.first_name = 'Matthew'
  AND customer.last_name = 'Mahan'
  AND (
        film.title ILIKE '%boat%'
        OR film.description ILIKE '%boat%'
      )
  AND film.replacement_cost > 15
ORDER BY film.replacement_cost DESC;