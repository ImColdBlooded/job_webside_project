-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 21, 2023 at 11:33 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bazadanychpraca`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `company_details`
--

CREATE TABLE `company_details` (
  `company details_id` int(11) NOT NULL,
  `company_name` text NOT NULL,
  `company_address` text NOT NULL,
  `company_location` text NOT NULL,
  `notification_of_work` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `links`
--

CREATE TABLE `links` (
  `links_id` int(11) NOT NULL,
  `Github` text NOT NULL,
  `Microsoft` text NOT NULL,
  `NHentai` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notification_of_work`
--

CREATE TABLE `notification_of_work` (
  `notification_of_work_id` int(11) NOT NULL,
  `notification_title` text NOT NULL,
  `notification_descript` text NOT NULL,
  `notification_work_position` text NOT NULL,
  `work_position` int(11) NOT NULL,
  `job_level` text NOT NULL,
  `contract_type` enum('okres próbny','na czas określony','na czas nieokreślony','') NOT NULL,
  `employment_dimensions` text NOT NULL,
  `type_of_work` int(11) NOT NULL,
  `salary_range_start` decimal(11,0) NOT NULL,
  `salary_range_end` decimal(11,0) NOT NULL,
  `working_days` enum('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
  `working_hours_start` time NOT NULL,
  `working_hours_end` time NOT NULL,
  `date_of_expiry_start` date NOT NULL,
  `date_of_expiry_end` date NOT NULL,
  `category` int(11) NOT NULL,
  `responsibilities` text NOT NULL,
  `candidate_requirements` text NOT NULL,
  `employer_offers` text NOT NULL,
  `about_the_company` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `residence_place`
--

CREATE TABLE `residence_place` (
  `residence_place_id` int(11) NOT NULL,
  `place_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `type_of_work`
--

CREATE TABLE `type_of_work` (
  `type_of_work_id` int(11) NOT NULL,
  `type_of_work_type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `birth_date` date DEFAULT NULL,
  `email` text NOT NULL,
  `tel_number` int(9) DEFAULT NULL,
  `prof_image` blob NOT NULL DEFAULT '',
  `residence_place` int(11) DEFAULT NULL,
  `curr_position` text DEFAULT NULL,
  `curr_position_description` text DEFAULT NULL,
  `career_summary` text DEFAULT NULL,
  `work_experience` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `language_skills` enum('poziom A1 (początkujący)','poziom A2 (początkujący)','poziom B1 (średnio zaawansowany)','poziom B2 (średnio zaawansowany)','poziom C1 (zaawansowany)','poziom C2 (zaawansowany)') DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `courses` text DEFAULT NULL,
  `password_hash` text NOT NULL,
  `links` int(11) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `birth_date`, `email`, `tel_number`, `prof_image`, `residence_place`, `curr_position`, `curr_position_description`, `career_summary`, `work_experience`, `education`, `language_skills`, `skills`, `courses`, `password_hash`, `links`, `isAdmin`) VALUES
(1, 'Jan', 'Kowalski', NULL, 'JK@gmail.com', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$1FABNM9beKIZHWP53ZIFMekRqTC89t/I171BHGjmOajYGtll6/dNq', NULL, 1),
(5, 'Halina', 'Kowalska', NULL, 'Halina@gmail.com', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$69bz.JCzBjkeDl96r6MRdeKdH9aIOFP35/oRmJVkTrAYfi8Uo8o6S', NULL, 0),
(7, 'Jan', 'Kowalski', NULL, 'JK@gmail.com', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$6x6vYLl61UFdFZ2mwihikeOgHD5rssm3zXs0CLBp7c6KAGPhTtdv2', NULL, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeksy dla tabeli `company_details`
--
ALTER TABLE `company_details`
  ADD PRIMARY KEY (`company details_id`),
  ADD KEY `notification_of_work` (`notification_of_work`);

--
-- Indeksy dla tabeli `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`links_id`);

--
-- Indeksy dla tabeli `notification_of_work`
--
ALTER TABLE `notification_of_work`
  ADD PRIMARY KEY (`notification_of_work_id`),
  ADD KEY `work_position` (`work_position`),
  ADD KEY `employment_dimensions` (`employment_dimensions`(768)),
  ADD KEY `type_of_work` (`type_of_work`),
  ADD KEY `category` (`category`);

--
-- Indeksy dla tabeli `residence_place`
--
ALTER TABLE `residence_place`
  ADD PRIMARY KEY (`residence_place_id`);

--
-- Indeksy dla tabeli `type_of_work`
--
ALTER TABLE `type_of_work`
  ADD PRIMARY KEY (`type_of_work_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `links` (`links`),
  ADD KEY `residence_place` (`residence_place`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_details`
--
ALTER TABLE `company_details`
  MODIFY `company details_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `links_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_of_work`
--
ALTER TABLE `notification_of_work`
  MODIFY `notification_of_work_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `residence_place`
--
ALTER TABLE `residence_place`
  MODIFY `residence_place_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `type_of_work`
--
ALTER TABLE `type_of_work`
  MODIFY `type_of_work_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
