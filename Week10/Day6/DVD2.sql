UPDATE film
SET language_id = (
    SELECT language_id
    FROM language
    WHERE name = 'French'
)
WHERE film_id IN (1, 2, 3)
RETURNING film_id, title, language_id;


SELECT
    tc.constraint_name,
    kcu.column_name,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
INNER JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
INNER JOIN information_schema.constraint_column_usage AS ccu
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.table_name = 'customer'
  AND tc.constraint_type = 'FOREIGN KEY';


DROP TABLE IF EXISTS customer_review;


SELECT COUNT(*) AS ongoing_rentals
FROM rental
WHERE return_date IS NULL;


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