BEGIN;
    DROP TABLE IF EXISTS users
    CASCADE;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    password VARCHAR(500) NOT NULL,
    user_telephone NUMERIC NOT NULL,
    role VARCHAR(50) NOT NULL

);

COMMIT;


