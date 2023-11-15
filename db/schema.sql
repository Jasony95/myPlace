DROP DATABASE IF EXISTS myplaces_db;
CREATE DATABASE myplaces_db;
USE myplaces_db;

CREATE TABLE categories(
	id INT AUTO_INCREMENT NOT NULL,
    category_name VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE user(
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(200),
    password VARCHAR(200),
    email VARCHAR(250),
    PRIMARY KEY (id)
);

CREATE TABLE places(
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(1000),
    address VARCHAR(1000),
    latitude DECIMAL(9,6),
    longitude DECIMAL(8,6),
    category_id INT,
    user_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE comments(
	id INT AUTO_INCREMENT NOT NULL,
	text TEXT,
	user_id INT,
    place_id INT,
    time_created DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE SET NULL
);