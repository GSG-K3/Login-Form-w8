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

INSERT INTO users
            (user_name, user_email, password, user_telephone,role)
VALUES
            ('loginTeam', 'loginTeam@gmail.com',
                        'password123', 0523456789, 'admin');

INSERT INTO users
            (user_name, user_email, password, user_telephone,role)
VALUES
            ('Bayan', 'Bayan@gmail.com',
                        'Bayan123', 0523456789, 'user');

INSERT INTO users
            (user_name, user_email, password, user_telephone,role)
VALUES
            ('Jacob', 'Jacob.com',
                        'Jacob123', 0523456789, 'user');

COMMIT;


