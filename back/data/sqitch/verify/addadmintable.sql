BEGIN;

-- Vérifie que toutes les tables attendues existent
WITH expected_tables(name) AS (
    VALUES  ('administrator')
)
SELECT name
FROM expected_tables
WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = name
);

ROLLBACK;