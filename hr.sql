-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2021 at 02:10 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hr`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` bigint(20) NOT NULL,
  `fname` varchar(200) DEFAULT NULL,
  `lname` varchar(200) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `dob` varchar(200) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `country` varchar(200) DEFAULT NULL,
  `ad` varchar(200) DEFAULT NULL,
  `salary` varchar(200) DEFAULT NULL,
  `cl` varchar(500) DEFAULT NULL,
  `cv` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `fname`, `lname`, `email`, `phone`, `dob`, `address`, `country`, `ad`, `salary`, `cl`, `cv`) VALUES
(10, 'David', 'Ojo', 'davidmatthew708@gmail.com', '+2340809141443', '1985/08/13', '3 Fez Street\nwuse 2', 'Nigeria', 'Newspaper Ad', '2000000000', '/Docs/CoverLetter/45b30cc76879c8b1d02eede04a6f41de.pdf', '/Docs/Resume/44dce8592c783bbd0b926d8478227396.pdf'),
(11, 'David', 'Ojo', 'davidmatthew708@gmail.com', '+2340809141443', '1970/08/14', '3 Fez Street\nwuse 2', 'Nigeria', 'Job Board', '200000', '/Docs/CoverLetter/623493f4634347f723f6ae285d9658b2.pdf', '/Docs/Resume/60eb5ad1558387564b9aa6b6da291110.pdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
