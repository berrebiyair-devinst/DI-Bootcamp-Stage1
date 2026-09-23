CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age DATE NOT NULL,
    number_oscars SMALLINT NOT NULL
);

INSERT INTO actors (first_name, last_name, age, number_oscars)
VALUES
    ('Matt', 'Damon', '1970-10-08', 5),
    ('George', 'Clooney', '1961-05-06', 2),
    ('Natalie', 'Portman', '1981-06-09', 1),
    ('Meryl', 'Streep', '1949-06-22', 3);

SELECT * FROM actors;

SELECT COUNT(*) AS total_actors
FROM actors;

INSERT INTO actors (first_name, last_name)
VALUES ('Brad', 'Pitt');