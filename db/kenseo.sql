-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2018 at 11:32 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kenseo`
--

-- --------------------------------------------------------

--
-- Table structure for table `artefacts`
--

CREATE TABLE `artefacts` (
  `artefact_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `artefact_title` text,
  `description` text,
  `latest_version_id` int(10) UNSIGNED DEFAULT NULL,
  `state` char(1) DEFAULT 'O' COMMENT 'O - Open \nD - Delete \nA - Archive',
  `artefact_type` char(2) DEFAULT NULL COMMENT 'Type of the document examples.I - IXDU - UIDS - Support DocumentP - Primary DeliverableE - External Document URL',
  `replace_ref_id` int(11) DEFAULT NULL COMMENT 'Artefact id with which the artefact has been replaced',
  `linked_id` int(11) DEFAULT NULL COMMENT 'This is unique id which is used to get all artefacts of same link.'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_comments`
--

CREATE TABLE `artefact_comments` (
  `comment_id` int(11) NOT NULL,
  `comment_thread_id` int(11) DEFAULT NULL,
  `comment_by` int(11) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `is_submitted` int(1) NOT NULL DEFAULT '0' COMMENT '0 - not submitted, 1 - submitted',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `markup` varchar(128) DEFAULT NULL COMMENT 'Need to get info',
  `state` char(1) DEFAULT NULL COMMENT 'Need to get info'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_comment_threads`
--

CREATE TABLE `artefact_comment_threads` (
  `comment_thread_id` int(11) NOT NULL,
  `artefact_ver_id` int(11) NOT NULL,
  `comment_thread_by` int(11) DEFAULT NULL,
  `page_no` tinyint(4) DEFAULT NULL COMMENT 'Page number on which comment is created',
  `posx` varchar(25) DEFAULT NULL COMMENT 'X- Position of document page',
  `posy` varchar(25) DEFAULT NULL COMMENT 'Y- Position of document page',
  `category` char(1) DEFAULT NULL COMMENT 'I - IxD\nU - UID\nT - Typo\nP - Persona',
  `severity` char(1) DEFAULT NULL COMMENT 'R - High\nB - Medium\nG - Low',
  `is_private` tinyint(1) DEFAULT '0',
  `is_submitted` int(11) NOT NULL DEFAULT '0' COMMENT 'States whether this comment is submitted',
  `state` char(1) DEFAULT NULL COMMENT 'O - Open\nR - Resolved\nV - Verified\nC - Closed\nX - Re-opened',
  `comment_type` char(1) DEFAULT NULL COMMENT 'G - Global comment\nI - Inline comment\n'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_links`
--

CREATE TABLE `artefact_links` (
  `linked_from_id` int(11) NOT NULL,
  `linked_to_id` int(11) NOT NULL,
  `linked_id` int(11) NOT NULL COMMENT 'Need to get info',
  `linked_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `while_creation` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_ref_docs`
--

CREATE TABLE `artefact_ref_docs` (
  `ref_doc_id` int(11) NOT NULL,
  `artefact_ver_id` int(11) DEFAULT NULL,
  `artefact_id` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `ref_document_path` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_shared_members`
--

CREATE TABLE `artefact_shared_members` (
  `artefact_ver_id` int(11) NOT NULL,
  `artefact_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_type` char(1) DEFAULT NULL COMMENT 'R - Read only\nE - Read and Edit/Comment\nS - Read and Share\nX - Read, Edit/Comment, Share',
  `band_percentage` int(11) DEFAULT NULL COMMENT 'Need to get info',
  `shared_date` timestamp NULL DEFAULT NULL,
  `shared_by` int(11) DEFAULT NULL,
  `while_creation` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_tags_map`
--

CREATE TABLE `artefact_tags_map` (
  `artefact_id` int(11) NOT NULL,
  `tag_id` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `user_generated` int(1) NOT NULL DEFAULT '0' COMMENT '0 - when automatically generated,1 - when user defined'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `artefact_versions`
--

CREATE TABLE `artefact_versions` (
  `artefact_ver_id` int(11) NOT NULL,
  `artefact_id` int(11) NOT NULL,
  `version_no` int(11) NOT NULL,
  `masked_artefact_version_id` varchar(100) DEFAULT NULL,
  `version_label` varchar(125) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `document_path` varchar(128) DEFAULT NULL,
  `MIME_type` varchar(45) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `state` char(1) DEFAULT NULL COMMENT 'C - Critical (When any comment thread is of type RED)\nN - Normal (No RED comments and when any comment thread is of type BLUE)\nA - Approved (No RED and BLUE comments)\n\nAutomatically when are no comments, it will be ''A''.',
  `shared` binary(1) DEFAULT NULL COMMENT '0 - non-shared\n1 - shared (for review)'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `auth_session`
--

CREATE TABLE `auth_session` (
  `id` int(11) NOT NULL,
  `sid` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `client_id` varchar(45) DEFAULT NULL,
  `expiry` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth_session`
--

INSERT INTO `auth_session` (`id`, `sid`, `user_id`, `client_id`, `expiry`, `created_date`) VALUES
(5, 'u8qkvm59r49iblbl2b57jjnb83', '1', '::1', 1526975775, '2018-05-15 07:56:15'),
(6, '6hskfctrtdik4sg2kckejjraa3', '1', '::1', 1526394829, '2018-05-15 14:28:27'),
(7, 'p95qeramd3dg0kebu8vorfnb77', '1', '::1', 1526999646, '2018-05-15 14:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `comment_history`
--

CREATE TABLE `comment_history` (
  `comment_id` int(11) NOT NULL,
  `comment_severity` int(11) DEFAULT NULL,
  `comment_state` char(1) DEFAULT NULL,
  `comment_category` char(1) DEFAULT NULL,
  `comment_thread_id` int(11) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meeting_id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `meeting_time` timestamp NULL DEFAULT NULL,
  `meeting_agenda` varchar(255) DEFAULT NULL,
  `meeting_title` varchar(45) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `meeting_on_artefact_id` int(11) DEFAULT NULL,
  `venue` varchar(125) DEFAULT NULL,
  `google_meeting_ref_id` varchar(250) DEFAULT NULL,
  `google_meeting_ref_url` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meeting_id`, `project_id`, `meeting_time`, `meeting_agenda`, `meeting_title`, `created_by`, `meeting_on_artefact_id`, `venue`, `google_meeting_ref_id`, `google_meeting_ref_url`) VALUES
(22, 1, '2018-05-16 18:30:00', 'nothing', 'anything', 12, 141, 'somewhere', NULL, NULL),
(212, 1, '2018-05-16 18:30:00', 'nothing', 'anything', 12, 141, 'somewhere', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `meeting_notes`
--

CREATE TABLE `meeting_notes` (
  `meeting_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `participant_notes` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_public` int(1) DEFAULT NULL COMMENT '0 - Private\n1 - Public'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_participents`
--

CREATE TABLE `meeting_participents` (
  `meeting_id` int(11) NOT NULL,
  `participent_id` int(11) NOT NULL,
  `invitation_date` timestamp NULL DEFAULT NULL,
  `invited_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(11) NOT NULL COMMENT 'A unique number to determine the notification',
  `project_id` int(11) DEFAULT NULL,
  `notification_by` int(11) DEFAULT NULL COMMENT 'User Id who has created this notification',
  `notification_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp of the notification generated date',
  `notification_type` int(11) DEFAULT NULL COMMENT 'Maps to notification_type_map table',
  `notification_on` int(11) NOT NULL COMMENT 'maps to notification_on_map table',
  `notification_ref_id` bigint(20) DEFAULT NULL COMMENT 'Based on notification_on it determines whether the notification is related to artefact version, project, user or meeting invitation'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `project_id`, `notification_by`, `notification_date`, `notification_type`, `notification_on`, `notification_ref_id`) VALUES
(1, 3, 1, '2018-05-16 09:30:10', 1, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `notification_on_map`
--

CREATE TABLE `notification_on_map` (
  `notification_on_id` int(11) NOT NULL,
  `notification_on_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_on_map`
--

INSERT INTO `notification_on_map` (`notification_on_id`, `notification_on_name`) VALUES
(1, 'artefact'),
(2, 'project'),
(3, 'meeting'),
(4, 'user'),
(5, 'comment');

-- --------------------------------------------------------

--
-- Table structure for table `notification_type_map`
--

CREATE TABLE `notification_type_map` (
  `notification_type_id` int(11) NOT NULL,
  `notification_type_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_type_map`
--

INSERT INTO `notification_type_map` (`notification_type_id`, `notification_type_name`) VALUES
(1, 'add'),
(2, 'edit'),
(3, 'share'),
(4, 'rename'),
(5, 'archive'),
(6, 'unarchive'),
(7, 'delete'),
(8, 'change'),
(9, 'submit'),
(10, 'replace'),
(11, 'add version'),
(12, 'download'),
(13, 'update'),
(14, 'add cover image'),
(15, 'change permission');

-- --------------------------------------------------------

--
-- Table structure for table `notification_users_map`
--

CREATE TABLE `notification_users_map` (
  `notification_id` bigint(20) NOT NULL COMMENT 'Refers the notification_id of notifications table',
  `user_id` int(11) NOT NULL COMMENT 'Refers the user_id of users table',
  `notification_state` char(1) NOT NULL DEFAULT 'U' COMMENT 'U - Unread, R - Read, A - Archive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_users_map`
--

INSERT INTO `notification_users_map` (`notification_id`, `user_id`, `notification_state`) VALUES
(1, 1, 'U');

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `org_id` tinyint(4) NOT NULL,
  `org_name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`org_id`, `org_name`, `description`) VALUES
(1, 'Divami', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `value` varchar(5) DEFAULT NULL,
  `link_ids` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`name`, `code`, `value`, `link_ids`) VALUES
('AccessType', 'All', 'X', NULL),
('AccessType', 'Edit', 'R', NULL),
('AccessType', 'Read', 'R', NULL),
('AccessType', 'Share', 'S', NULL),
('ArtefactType', 'Information Architecture', 'IA', '3'),
('ArtefactType', 'IxD', 'I', '1'),
('ArtefactType', 'Persona', 'P', '4'),
('ArtefactType', 'UID', 'U', '2'),
('CommentSeverity', 'High', 'R', NULL),
('CommentSeverity', 'Low', 'G', NULL),
('CommentSeverity', 'Medium', 'B', NULL),
('CommentType', 'IxD', 'I', NULL),
('CommentType', 'Persona', 'P', NULL),
('CommentType', 'Typo', 'T', NULL),
('CommentType', 'UID', 'U', NULL),
('VersionState', 'Approved', 'A', NULL),
('VersionState', 'Critical', 'C', NULL),
('VersionState', 'Normal', 'N', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `project_name` varchar(50) DEFAULT NULL,
  `description` text,
  `intro_image_url` longtext,
  `state` char(1) DEFAULT NULL COMMENT 'A - Active\nC - Closed\nZ - Archive',
  `org_id` tinyint(4) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `last_updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_name`, `description`, `intro_image_url`, `state`, `org_id`, `created_by`, `last_updated_date`) VALUES
(3, 'Kenseo', 'This is an Internal project which deals with Reviewing of documents.', NULL, 'A', 1, 1, '2018-05-16 04:00:10');

-- --------------------------------------------------------

--
-- Table structure for table `project_activity`
--

CREATE TABLE `project_activity` (
  `activity_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `logged_by` int(11) DEFAULT NULL COMMENT 'User Id of the logged person',
  `logged_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `performed_on` char(1) DEFAULT NULL COMMENT 'Activity performed on \nEx: A - Artefact\n      M - Meeting Invitation\n      U - User',
  `activity_type` char(1) DEFAULT NULL COMMENT 'Type of activity performed\nEx: N - New\n       R - Remove\n       U - Update\n       H - Hold\n       C - Comment\n       S - Share',
  `performed_on_id` int(11) DEFAULT NULL COMMENT 'Ex: Meeting Id/ Artefact ID/ User Id\n     '
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `proj_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` char(1) DEFAULT NULL,
  `access_type` char(1) DEFAULT NULL COMMENT 'R - Read only\nE - Read and Edit/Comment\nS - Read and Share\nX - Read, Edit/Comment, Share',
  `group_type` char(1) DEFAULT NULL COMMENT 'I - Internal\nE - External'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`proj_id`, `user_id`, `role`, `access_type`, `group_type`) VALUES
(3, 1, NULL, 'X', 'I');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(45) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`, `org_id`, `created_date`) VALUES
(1, '@IxD', 1, '2016-01-11 10:03:08'),
(2, '@UID', 1, '2016-01-11 10:03:08'),
(3, '@Information Architecture', 1, '2016-01-11 10:04:17'),
(4, '@Persona', 1, '2016-01-11 10:04:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `screen_name` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `profile_pic_url` varchar(512) DEFAULT 'assets/imgs/avatar.svg',
  `user_access_type` char(1) NOT NULL DEFAULT 'O' COMMENT 'A - Super Admin, E - Employee, O - Other users eg. clients or outsiders',
  `org_id` tinyint(4) DEFAULT NULL,
  `login_type` char(1) DEFAULT NULL COMMENT 'N - normal\nG - google',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `screen_name`, `email`, `password`, `designation`, `profile_pic_url`, `user_access_type`, `org_id`, `login_type`, `created_date`) VALUES
(1, 'Sowmya', 'Sowmya', 'soumyaranjan@divami.com', NULL, 'Developer', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', 'O', 1, 'G', '2018-05-14 10:21:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artefacts`
--
ALTER TABLE `artefacts`
  ADD PRIMARY KEY (`artefact_id`);

--
-- Indexes for table `artefact_comments`
--
ALTER TABLE `artefact_comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `artefact_comment_threads`
--
ALTER TABLE `artefact_comment_threads`
  ADD PRIMARY KEY (`comment_thread_id`,`artefact_ver_id`);

--
-- Indexes for table `artefact_ref_docs`
--
ALTER TABLE `artefact_ref_docs`
  ADD PRIMARY KEY (`ref_doc_id`);

--
-- Indexes for table `artefact_shared_members`
--
ALTER TABLE `artefact_shared_members`
  ADD PRIMARY KEY (`artefact_ver_id`,`user_id`,`artefact_id`);

--
-- Indexes for table `artefact_versions`
--
ALTER TABLE `artefact_versions`
  ADD PRIMARY KEY (`artefact_ver_id`);

--
-- Indexes for table `auth_session`
--
ALTER TABLE `auth_session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment_history`
--
ALTER TABLE `comment_history`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meeting_id`);

--
-- Indexes for table `meeting_notes`
--
ALTER TABLE `meeting_notes`
  ADD PRIMARY KEY (`meeting_id`,`participant_id`);

--
-- Indexes for table `meeting_participents`
--
ALTER TABLE `meeting_participents`
  ADD PRIMARY KEY (`meeting_id`,`participent_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `notification_on_map`
--
ALTER TABLE `notification_on_map`
  ADD PRIMARY KEY (`notification_on_id`);

--
-- Indexes for table `notification_type_map`
--
ALTER TABLE `notification_type_map`
  ADD PRIMARY KEY (`notification_type_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`org_id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`name`,`code`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD UNIQUE KEY `project_name_UNIQUE` (`project_name`);

--
-- Indexes for table `project_activity`
--
ALTER TABLE `project_activity`
  ADD PRIMARY KEY (`activity_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`proj_id`,`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artefacts`
--
ALTER TABLE `artefacts`
  MODIFY `artefact_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `artefact_comments`
--
ALTER TABLE `artefact_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `artefact_comment_threads`
--
ALTER TABLE `artefact_comment_threads`
  MODIFY `comment_thread_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `artefact_ref_docs`
--
ALTER TABLE `artefact_ref_docs`
  MODIFY `ref_doc_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `artefact_versions`
--
ALTER TABLE `artefact_versions`
  MODIFY `artefact_ver_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `auth_session`
--
ALTER TABLE `auth_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT 'A unique number to determine the notification', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `notification_on_map`
--
ALTER TABLE `notification_on_map`
  MODIFY `notification_on_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `notification_type_map`
--
ALTER TABLE `notification_type_map`
  MODIFY `notification_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `org_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `project_activity`
--
ALTER TABLE `project_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
