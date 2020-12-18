DROP DATABASE IF EXISTS fortunes_db;
CREATE DATABASE fortunes_db;
USE fortunes_db;

CREATE TABLE fortunes
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	random_fortune varchar(255) NOT NULL
);