CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
    ('Piero Luigi', 'pieroluigi@gmail.com'),
    ('chacario', 'chacario@gmail.com');

/*Para retornar el usuario eliminado*/
DELETE FROM users WHERE user_id = 4 RETURNING *;

/*email unico*/

{
    "user_id": 1,
    "name": "Piero Luigi",
    "email": "pieroluigi@gmail.com",
    "created_at": "2026-02-13T13:20:12.945Z"
}

{
    "user_id": 2,
    "name": "chacario",
    "email": "chacario@gmail.com",
    "created_at": "2026-02-13T13:20:12.945Z"
}