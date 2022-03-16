CREATE DATABASE chat;

USE `chat`;

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(20) NOT NULL
);

CREATE TABLE `messages` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `body` TEXT NOT NULL,
  `room_id` INT DEFAULT 1,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`room_id`) REFERENCES rooms(`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

