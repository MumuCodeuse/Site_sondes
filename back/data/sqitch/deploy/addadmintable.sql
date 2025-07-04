-- Création de la table administratrice
BEGIN;

--Administratrice
DROP TABLE IF EXISTS administrator;
CREATE TABLE administrator (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    createdAT TIMESTAMP WITHOUT TIME ZONE,
    updatedAt TIMESTAMP WITHOUT TIME ZONE
);

COMMIT;
 