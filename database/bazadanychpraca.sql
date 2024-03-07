-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2024 at 12:10 AM
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
-- Struktura tabeli dla tabeli `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` text NOT NULL,
  `company_address` text NOT NULL,
  `company_location` text NOT NULL,
  `notification_of_work_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `courses`
--

CREATE TABLE `courses` (
  `courses_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `organiser` text NOT NULL,
  `course_startDate` date NOT NULL,
  `course_endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `education`
--

CREATE TABLE `education` (
  `education_id` int(11) NOT NULL,
  `school_name` text NOT NULL,
  `country` text NOT NULL,
  `education_level` text NOT NULL,
  `direction` text NOT NULL,
  `education_dateStart` date NOT NULL,
  `education_dateEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `language_skills`
--

CREATE TABLE `language_skills` (
  `language_skills_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `level` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `links`
--

CREATE TABLE `links` (
  `links_id` int(11) NOT NULL,
  `link_name` text NOT NULL,
  `link_source` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notification_of_work`
--

CREATE TABLE `notification_of_work` (
  `notification_of_work_id` int(11) NOT NULL,
  `notification_title` text NOT NULL,
  `notification_descript` text NOT NULL,
  `work_position` text NOT NULL,
  `job_level` text NOT NULL,
  `contract_type` text NOT NULL,
  `employment_dimensions` text NOT NULL,
  `type_of_work_id` int(11) NOT NULL,
  `salary_range_start` decimal(11,0) NOT NULL,
  `salary_range_end` decimal(11,0) NOT NULL,
  `working_days` text NOT NULL,
  `working_hours_start` time NOT NULL,
  `working_hours_end` time NOT NULL,
  `date_of_expiry_start` date NOT NULL,
  `date_of_expiry_end` date NOT NULL,
  `category_id` int(11) NOT NULL,
  `responsibilities` text NOT NULL,
  `candidate_requirements` text NOT NULL,
  `employer_offers` text NOT NULL,
  `about_the_company` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `residence_place`
--

CREATE TABLE `residence_place` (
  `residence_place_id` int(11) NOT NULL,
  `place_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `residence_place`
--

INSERT INTO `residence_place` (`residence_place_id`, `place_name`) VALUES
(1, 'Limanowa'),
(2, 'Krakow');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skills`
--

CREATE TABLE `skills` (
  `skills_id` int(11) NOT NULL,
  `skill_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `tel_number` text DEFAULT NULL,
  `prof_image` blob NOT NULL DEFAULT '',
  `curr_position` text DEFAULT NULL,
  `curr_position_description` text DEFAULT NULL,
  `career_summary` text DEFAULT NULL,
  `password_hash` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `birth_date`, `email`, `tel_number`, `prof_image`, `curr_position`, `curr_position_description`, `career_summary`, `password_hash`, `isAdmin`) VALUES
(12, 'Jan', 'Kowalski', '2024-03-10', 'jkowalski@gmail.com', '123123123', '', 'Kasjer', 'kasjer', 'sex', '$2y$10$U3A6l.S4zFL3fVTj4MyxPusHIk9VxMGUxyYRi85U2AIiSgKgUvgEy', 0),
(19, 'admin', 'admin', NULL, 'admin@gmail.com', NULL, '', NULL, NULL, NULL, '$2y$10$aPgkJqkIlwax72ooDnScduoCkkwohuFGc4D7y6LaN0EkyoPxRHyF.', 1),
(24, 'Bartłomiej', 'Bolisęga', '2024-02-29', 'bbolisega@gmail.com', '123123123', '', 'Programista', 'Jestem wolnym agentem który przyjmuje zlecenia na aplikacje webowe, desktopowe, mobilne', 'Wolny agent nie posiadam podsumowania zawodowego', '$2y$10$n7iBqAhz6zvSkbtQAfHuNOzK8Hkh4MMNorVlfoSBHJlSEBw32IuIO', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_company`
--

CREATE TABLE `user_company` (
  `user_company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_course`
--

CREATE TABLE `user_course` (
  `user_course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_education`
--

CREATE TABLE `user_education` (
  `user_education_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `education_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_language_skills`
--

CREATE TABLE `user_language_skills` (
  `user_language_skills_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `language_skills` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_link`
--

CREATE TABLE `user_link` (
  `user_link` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `link_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_residence_place`
--

CREATE TABLE `user_residence_place` (
  `user_residence_place` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `residence_place_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_skills`
--

CREATE TABLE `user_skills` (
  `user_skills_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skills_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_workexperience`
--

CREATE TABLE `user_workexperience` (
  `user_workExperience_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `work_experience_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `work_experience`
--

CREATE TABLE `work_experience` (
  `work_experience_id` int(11) NOT NULL,
  `position` text NOT NULL,
  `company_id` int(11) NOT NULL,
  `location` text NOT NULL,
  `workDate_Start` date NOT NULL,
  `workDate_End` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indeksy dla tabeli `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD KEY `notification_of_work` (`notification_of_work_id`);

--
-- Indeksy dla tabeli `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courses_id`);

--
-- Indeksy dla tabeli `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`education_id`);

--
-- Indeksy dla tabeli `language_skills`
--
ALTER TABLE `language_skills`
  ADD PRIMARY KEY (`language_skills_id`);

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
  ADD KEY `type_of_work` (`type_of_work_id`),
  ADD KEY `category` (`category_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `residence_place`
--
ALTER TABLE `residence_place`
  ADD PRIMARY KEY (`residence_place_id`);

--
-- Indeksy dla tabeli `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`skills_id`);

--
-- Indeksy dla tabeli `type_of_work`
--
ALTER TABLE `type_of_work`
  ADD PRIMARY KEY (`type_of_work_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_company`
--
ALTER TABLE `user_company`
  ADD PRIMARY KEY (`user_company_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indeksy dla tabeli `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`user_course_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indeksy dla tabeli `user_education`
--
ALTER TABLE `user_education`
  ADD PRIMARY KEY (`user_education_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `education_id` (`education_id`);

--
-- Indeksy dla tabeli `user_language_skills`
--
ALTER TABLE `user_language_skills`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `language_skills` (`language_skills`);

--
-- Indeksy dla tabeli `user_link`
--
ALTER TABLE `user_link`
  ADD PRIMARY KEY (`user_link`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `link_id` (`link_id`);

--
-- Indeksy dla tabeli `user_residence_place`
--
ALTER TABLE `user_residence_place`
  ADD PRIMARY KEY (`user_residence_place`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `residence_place_id` (`residence_place_id`);

--
-- Indeksy dla tabeli `user_skills`
--
ALTER TABLE `user_skills`
  ADD PRIMARY KEY (`user_skills_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `skills_id` (`skills_id`);

--
-- Indeksy dla tabeli `user_workexperience`
--
ALTER TABLE `user_workexperience`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `work_experience_id` (`work_experience_id`);

--
-- Indeksy dla tabeli `work_experience`
--
ALTER TABLE `work_experience`
  ADD PRIMARY KEY (`work_experience_id`),
  ADD KEY `company_id` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `courses_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `education_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `language_skills`
--
ALTER TABLE `language_skills`
  MODIFY `language_skills_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `residence_place_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `skills_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `type_of_work`
--
ALTER TABLE `type_of_work`
  MODIFY `type_of_work_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_company`
--
ALTER TABLE `user_company`
  MODIFY `user_company_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `user_course_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_education`
--
ALTER TABLE `user_education`
  MODIFY `user_education_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_link`
--
ALTER TABLE `user_link`
  MODIFY `user_link` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_residence_place`
--
ALTER TABLE `user_residence_place`
  MODIFY `user_residence_place` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_skills`
--
ALTER TABLE `user_skills`
  MODIFY `user_skills_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `work_experience`
--
ALTER TABLE `work_experience`
  MODIFY `work_experience_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notification_of_work`
--
ALTER TABLE `notification_of_work`
  ADD CONSTRAINT `notification_of_work_ibfk_1` FOREIGN KEY (`notification_of_work_id`) REFERENCES `company` (`notification_of_work_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_of_work_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notification_of_work_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_company`
--
ALTER TABLE `user_company`
  ADD CONSTRAINT `user_company_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_company_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`courses_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_education`
--
ALTER TABLE `user_education`
  ADD CONSTRAINT `user_education_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_education_ibfk_2` FOREIGN KEY (`education_id`) REFERENCES `education` (`education_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_language_skills`
--
ALTER TABLE `user_language_skills`
  ADD CONSTRAINT `user_language_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_language_skills_ibfk_2` FOREIGN KEY (`language_skills`) REFERENCES `language_skills` (`language_skills_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_link`
--
ALTER TABLE `user_link`
  ADD CONSTRAINT `user_link_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_link_ibfk_2` FOREIGN KEY (`link_id`) REFERENCES `links` (`links_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_residence_place`
--
ALTER TABLE `user_residence_place`
  ADD CONSTRAINT `user_residence_place_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_residence_place_ibfk_2` FOREIGN KEY (`residence_place_id`) REFERENCES `residence_place` (`residence_place_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_skills`
--
ALTER TABLE `user_skills`
  ADD CONSTRAINT `user_skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_skills_ibfk_2` FOREIGN KEY (`skills_id`) REFERENCES `skills` (`skills_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_workexperience`
--
ALTER TABLE `user_workexperience`
  ADD CONSTRAINT `user_workexperience_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_workexperience_ibfk_2` FOREIGN KEY (`work_experience_id`) REFERENCES `work_experience` (`work_experience_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `work_experience`
--
ALTER TABLE `work_experience`
  ADD CONSTRAINT `work_experience_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
