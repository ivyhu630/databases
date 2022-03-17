CREATE DATABASE chat;

USE `chat`;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE `messages` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `body` TEXT NOT NULL,
  `room_id` INT DEFAULT 1,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES rooms(`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

INSERT INTO users VALUES (DEFAULT, 'Ivy');
INSERT INTO users VALUES (DEFAULT, 'Walter');

INSERT INTO rooms VALUES (DEFAULT, 'Lobby');

INSERT INTO messages VALUES (DEFAULT, 'First message from Ivy', 1, 1);
INSERT INTO messages VALUES (DEFAULT, 'First message from Walter', 1, 2);
INSERT INTO messages VALUES (DEFAULT, 'Second message from Ivy', 1, 1);
INSERT INTO messages VALUES (DEFAULT, 'Second message from Walter', 1, 2);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

