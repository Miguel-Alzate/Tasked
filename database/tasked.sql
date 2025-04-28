-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 06:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasked`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` varchar(36) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `group_description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `group_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `module_id` varchar(36) NOT NULL,
  `module_name` varchar(50) NOT NULL,
  `module_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`module_id`, `module_name`, `module_description`) VALUES
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', 'User Management', 'Manage users and their roles'),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', 'Task Management', 'Manage tasks and their assignments'),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', 'Role Management', 'Manage roles and permissions'),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', 'Permission Management', 'Manage permissions for each role');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `module_id` varchar(36) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  `p_insert` tinyint(1) NOT NULL DEFAULT 0,
  `p_view` tinyint(1) NOT NULL DEFAULT 0,
  `p_update` tinyint(1) NOT NULL DEFAULT 0,
  `p_delete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`module_id`, `role_id`, `p_insert`, `p_view`, `p_update`, `p_delete`) VALUES
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', 0, 0, 0, 0),
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 1, 1, 1, 1),
('1e3f0b47-9b8e-4320-b7f5-7c74e89c2c6a', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', 0, 1, 0, 0),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', 0, 1, 1, 0),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 1, 1, 1, 1),
('7bdb9c6e-2e5b-4fa9-a663-837f7d69db28', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', 1, 1, 1, 1),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', 0, 0, 0, 0),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 1, 1, 1, 1),
('c234f105-fbfa-489e-9f43-1fd8cf2ea5f3', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', 0, 0, 0, 0),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', '11f94b9b-54e6-4269-b3b0-7270f2783a8f', 0, 0, 0, 0),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', '5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 1, 1, 1, 1),
('f07c0cf1-8cf5-4ff2-b7b7-4b1ff4b6f8c3', 'd2a39a1d-5244-4e8d-bc92-26fd13d59235', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` varchar(36) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `role_description`) VALUES
('11f94b9b-54e6-4269-b3b0-7270f2783a8f', 'Employee', 'Employee with basic access'),
('5f09c5ea-b4c4-45ed-8f4a-5901d99be72e', 'Admin', 'Administrator with full access'),
('d2a39a1d-5244-4e8d-bc92-26fd13d59235', 'Manager', 'Manager with limited access');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` varchar(36) NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `task_description` text NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','in_progress','completed') NOT NULL DEFAULT 'pending',
  `priority` enum('low','medium','high') NOT NULL DEFAULT 'low',
  `created_by` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_assignments`
--

CREATE TABLE `task_assignments` (
  `assignment_id` varchar(36) NOT NULL,
  `task_id` varchar(36) NOT NULL,
  `assigned_to` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `group_name_UNIQUE` (`group_name`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`group_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`module_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username_UNIQUE` (`user_name`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
  ADD CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `modules` (`module_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permissions_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task_assignments`
--
ALTER TABLE `task_assignments`
  ADD CONSTRAINT `task_assignments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_assignments_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
