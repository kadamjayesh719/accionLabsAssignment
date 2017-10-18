CREATE DATABASE IF NOT EXISTS `jayesh`;

CREATE TABLE IF NOT EXISTS  `jayesh`.`user_details` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(45) NOT NULL,
 `date_of_birth` date NOT NULL,
 `role` varchar(45) NOT NULL,
 `is_active` tinyint(1) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `id_UNIQUE` (`id`),
 UNIQUE KEY `name_UNIQUE` (`name`)
);

SET GLOBAL time_zone = '+5:30';

SET @@global.time_zone = '+5:30';
