CREATE TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

INSERT INTO FirstTab
VALUES
    (5, 'Pawan'),
    (6, 'Sharlee'),
    (7, 'Krish'),
    (NULL, 'Avtaar');

SELECT * FROM FirstTab;


CREATE TABLE SecondTab (
    id INTEGER
);

INSERT INTO SecondTab
VALUES
    (5),
    (NULL);

SELECT * FROM SecondTab;


-- Q1 hypothesis: the expected result is 0.
-- The subquery returns NULL.
-- Any comparison using NOT IN with NULL returns UNKNOWN.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id IS NULL
);


-- Q2 hypothesis: the expected result is 2.
-- The subquery returns 5, so only IDs 6 and 7 are counted.
-- The NULL ID is not counted because its comparison returns UNKNOWN.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id = 5
);


-- Q3 hypothesis: the expected result is 0.
-- The subquery returns both 5 and NULL.
-- The presence of NULL prevents NOT IN from returning TRUE.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
);


-- Q4 hypothesis: the expected result is 2.
-- The subquery excludes NULL and returns only 5.
-- Therefore, IDs 6 and 7 are counted.
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (
    SELECT id
    FROM SecondTab
    WHERE id IS NOT NULL
);