-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2026 at 07:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lacrochet`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price` float NOT NULL,
  `image_url` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stock_qty` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `image_url`, `category_id`, `stock_qty`, `is_active`, `created_at`) VALUES
(1, 'Crochet Daisy Tote Bag', 'Handmade cotton tote bag with a daisy pattern.', 450, '/images/products/daisy-tote.jpg', 0, 12, 0, '2026-11-18 13:56:05'),
(2, 'Crochet Tulip Bouquet', 'A handmade bouquet of three crochet tulips.', 350, '/images/products/tulip-bouquet.jpg', 0, 20, 0, '2026-11-18 13:56:05'),
(4, 'Crochet Sunflower Keychain', 'Handmade sunflower keychain for bags and keys.', 95, '/images/products/sunflower-keychain.jpg', 0, 25, 0, '2026-11-18 14:13:06'),
(5, 'Crochet Bucket Hat', 'Soft cotton crochet bucket hat for everyday wear.', 380, '/images/products/bucket-hat.jpg', 0, 10, 0, '2026-11-18 14:13:06'),
(6, 'Crochet Coaster Set', 'A set of four handmade cotton flower coasters.', 220, '/images/products/coaster-set.jpg', 0, 18, 0, '2026-11-18 14:13:06'),
(7, 'Crochet Phone Pouch', 'Lightweight crochet phone pouch with a shoulder strap.', 280, '/images/products/phone-pouch.jpg', 0, 15, 0, '2026-11-18 14:13:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
