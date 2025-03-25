/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `destination`;
CREATE TABLE `destination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `popular` tinyint(1) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `destination_activity`;
CREATE TABLE `destination_activity` (
  `destination_id` int NOT NULL,
  `activity_id` int NOT NULL,
  PRIMARY KEY (`destination_id`,`activity_id`),
  KEY `activity_id` (`activity_id`),
  CONSTRAINT `destination_activity_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destination` (`id`),
  CONSTRAINT `destination_activity_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tour`;
CREATE TABLE `tour` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_feature` tinyint(1) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `activity` (`id`, `name`, `description`) VALUES
(1, 'Beach', 'Relaxing and recreational activities on the beach.');
INSERT INTO `activity` (`id`, `name`, `description`) VALUES
(2, 'Museum', 'Exploring art, history, and culture exhibits.');
INSERT INTO `activity` (`id`, `name`, `description`) VALUES
(3, 'Park', 'Outdoor activities and relaxation in green spaces.');
INSERT INTO `activity` (`id`, `name`, `description`) VALUES
(4, 'City', 'Exploring urban areas and landmarks.');
INSERT INTO `destination` (`id`, `name`, `description`, `country`, `city`, `image_url`, `popular`, `duration`) VALUES
(1, 'Miami Beach', 'Beautiful beaches and vibrant nightlife.', 'USA', 'Miami', 'miami_beach.jpg', 1, '5 days');
INSERT INTO `destination` (`id`, `name`, `description`, `country`, `city`, `image_url`, `popular`, `duration`) VALUES
(2, 'Louvre Museum', 'Home to world-famous art collections.', 'France', 'Paris', 'louvre.jpg', 1, '1 day');
INSERT INTO `destination` (`id`, `name`, `description`, `country`, `city`, `image_url`, `popular`, `duration`) VALUES
(3, 'Central Park', 'Large urban park with various attractions.', 'USA', 'New York', 'central_park.jpg', 1, '1 day');
INSERT INTO `destination` (`id`, `name`, `description`, `country`, `city`, `image_url`, `popular`, `duration`) VALUES
(4, 'Tokyo City', 'Modern metropolis with rich culture and history.', 'Japan', 'Tokyo', 'tokyo_city.jpg', 1, '5 days');
INSERT INTO `destination` (`id`, `name`, `description`, `country`, `city`, `image_url`, `popular`, `duration`) VALUES
(5, 'Barcelona Beach', 'Famous for its sandy beaches and boardwalk.', 'Spain', 'Barcelona', 'barcelona_beach.jpg', 1, '4 days');

INSERT INTO `role` (`id`, `name`, `description`) VALUES
(1, 'user', 'user');
INSERT INTO `role` (`id`, `name`, `description`) VALUES
(2, 'admin', 'admin');
INSERT INTO `tour` (`id`, `name`, `description`, `price`, `rating`, `image_url`, `is_feature`, `duration`) VALUES
(1, 'Miami Beach Getaway', 'Relaxing beach vacation in Miami.', '1200.00', '4.70', 'miami_tour.jpg', 1, '5 days');
INSERT INTO `tour` (`id`, `name`, `description`, `price`, `rating`, `image_url`, `is_feature`, `duration`) VALUES
(2, 'Louvre Art Tour', 'Guided tour of the Louvre Museum.', '80.00', '4.50', 'louvre_tour.jpg', 1, '1 day');
INSERT INTO `tour` (`id`, `name`, `description`, `price`, `rating`, `image_url`, `is_feature`, `duration`) VALUES
(3, 'Central Park Bike Tour', 'Explore Central Park on a bike.', '50.00', '4.20', 'park_tour.jpg', 0, '1 day');
INSERT INTO `tour` (`id`, `name`, `description`, `price`, `rating`, `image_url`, `is_feature`, `duration`) VALUES
(4, 'Tokyo City Highlights', 'Discover the best of Tokyo city.', '1500.00', '4.80', 'tokyo_tour.jpg', 1, '5 days');
INSERT INTO `tour` (`id`, `name`, `description`, `price`, `rating`, `image_url`, `is_feature`, `duration`) VALUES
(5, 'Barcelona Beach & City Tour', 'Enjoy the beach and explore the city.', '1000.00', '4.60', 'barcelona_tour.jpg', 1, '4 days');
INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `email`, `phone`, `role_id`) VALUES
(1, 'john_doe', 'hashed_password_123', 'John Doe', 'john.doe@example.com', '123-456-7890', 1);
INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `email`, `phone`, `role_id`) VALUES
(2, 'jane_smith', 'hashed_password_456', 'Jane Smith', 'jane.smith@example.com', '987-654-3210', 1);
INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `email`, `phone`, `role_id`) VALUES
(3, 'admin_user', 'hashed_password_789', 'Admin User', 'admin@example.com', '555-123-4567', 2);
INSERT INTO `user` (`id`, `username`, `password`, `fullname`, `email`, `phone`, `role_id`) VALUES
(4, 'test', '$2a$10$BX7/pYvQbvTBsKbnYs0cSONxHwQHC.8NPqYY.JNUSgwGf.vvL6Gwq', NULL, 'test@gmail.com', NULL, 2);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;