-- Create users table with unique email constraint
-- Ensures id is auto-increment primary key and email is unique
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255)
);
