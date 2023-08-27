-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 28, 2023 at 03:16 AM
-- Server version: 8.0.34-0ubuntu0.22.04.1
-- PHP Version: 8.1.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tkjPanel`
--

-- --------------------------------------------------------

--
-- Table structure for table `ftpConf`
--

CREATE TABLE `ftpConf` (
  `idUserFtp` int NOT NULL,
  `usernameFtp` varchar(250) NOT NULL,
  `cluepwFtp` varchar(250) NOT NULL,
  `directoryFtp` varchar(250) NOT NULL,
  `hostFtp` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ftpConf`
--

INSERT INTO `ftpConf` (`idUserFtp`, `usernameFtp`, `cluepwFtp`, `directoryFtp`, `hostFtp`) VALUES
(32, 'ftp_NaxgrintingFTPC', 'nomer', '/home/tkjPanel/naxgrinting.lap/public_html', 'ftp.naxgrinting.lap');

-- --------------------------------------------------------

--
-- Table structure for table `mysqld`
--

CREATE TABLE `mysqld` (
  `idMysqld` int NOT NULL,
  `databaseName` varchar(250) NOT NULL,
  `userOwner` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mysqld`
--

INSERT INTO `mysqld` (`idMysqld`, `databaseName`, `userOwner`) VALUES
(5, 'cobaaja', 'coba'),
(6, 'dataPercobaan', 'percobaan');

-- --------------------------------------------------------

--
-- Table structure for table `mysqlu`
--

CREATE TABLE `mysqlu` (
  `idMysql` int NOT NULL,
  `host` varchar(250) NOT NULL,
  `userOwner` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kunciUtama` varchar(250) NOT NULL,
  `kunciCiri` varchar(250) NOT NULL,
  `token` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mysqlu`
--

INSERT INTO `mysqlu` (`idMysql`, `host`, `userOwner`, `kunciUtama`, `kunciCiri`, `token`) VALUES
(1, 'localhost', 'coba', 'coba123', 'angka nomer', '=uRucc98NT=*nEX8FH)4J%sQDd4v*?Ja)?#HrNoEmJwLjtzyCcfz_uD+ypwq-75>Nz8q6kd7sbUBo021JXzRuye4C5*2wB2ike-'),
(2, 'localhost', 'percobaan', 'percobaan123', 'huruf dan nomer', 'jTlfNxXpXIG$f6xQUGMDz#*pe^3zkZ>?QfwBhicIh<u<z&DMqJ$$Z)c9dYPWL(?S2=nPyQ?3RQNAa9boQR?MIucV*?sp=8oxMHM'),
(3, 'naxgrinting.lap', 'naxgrinting', 'naxgrinting123', 'huruf dan angka', 'YFR0S2>x!LoUSWFR%6z551FGZ-)s*N&69aibFyu)mcCdzIC+o3XAfaiak^%VpfO-ZqL1FZ>_@$8)w99HxC<g=tIuu@)_Qsc)Sos');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `idUsers` int NOT NULL,
  `nama` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `lisensi` varchar(100) NOT NULL,
  `token` varchar(1000) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUsers`, `nama`, `username`, `email`, `password`, `lisensi`, `token`, `created_at`, `updated_at`) VALUES
(1, 'khilmy firdaus r', 'khilmyfr', 'khilmyfr@tkjbulakamba.biz.id', '$2b$12$P/xEQRVccCZZCnakC0OqDuWlAbJ8lrSiRHtCXU6YoV/.fTveRW8BS', 'lisensiA', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1hIjoia2hpbG15IGZpcmRhdXMgciIsInVzZXJuYW1lIjoia2hpbG15ZnIiLCJlbWFpbCI6ImtoaWxteWZyQHRramJ1bGFrYW1iYS5iaXouaWQiLCJrZWxhcyI6Imxpc2Vuc2lBIiwiaWF0IjoxNjkxODM2MzI0LCJleHAiOjE2OTQ0MjgzMjR9.Vq-V-kFPadWmUfBvKSlUqFnKohYNnHqqyZPZ1YKHdmg', 'Sabtu, 12 Agustus 2023 17:32:04', 'Sabtu, 12 Agustus 2023 17:32:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ftpConf`
--
ALTER TABLE `ftpConf`
  ADD PRIMARY KEY (`idUserFtp`),
  ADD UNIQUE KEY `usernameFtp` (`usernameFtp`);

--
-- Indexes for table `mysqld`
--
ALTER TABLE `mysqld`
  ADD PRIMARY KEY (`idMysqld`),
  ADD UNIQUE KEY `databaseName` (`databaseName`);

--
-- Indexes for table `mysqlu`
--
ALTER TABLE `mysqlu`
  ADD PRIMARY KEY (`idMysql`),
  ADD UNIQUE KEY `userOwner` (`userOwner`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUsers`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ftpConf`
--
ALTER TABLE `ftpConf`
  MODIFY `idUserFtp` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `mysqld`
--
ALTER TABLE `mysqld`
  MODIFY `idMysqld` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mysqlu`
--
ALTER TABLE `mysqlu`
  MODIFY `idMysql` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUsers` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
