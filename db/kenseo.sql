-- MySQL Script generated by MySQL Workbench
-- 12/10/15 10:34:48
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema kenseo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kenseo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kenseo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `kenseo` ;

-- -----------------------------------------------------
-- Table `kenseo`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `screen_name` VARCHAR(20) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(45) NULL,
  `designation` VARCHAR(45) NULL,
  `profile_pic_url` VARCHAR(512) NULL DEFAULT 'assets/imgs/avatar.svg',
  `org_id` TINYINT(4) NULL,
  `login_type` CHAR(1) NULL COMMENT 'N - normal\nG - google',
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`organizations` (
  `org_id` TINYINT(4) NOT NULL AUTO_INCREMENT,
  `org_name` VARCHAR(50) NULL,
  `description` VARCHAR(50) NULL,
  PRIMARY KEY (`org_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`projects` (
  `project_id` INT NOT NULL AUTO_INCREMENT,
  `project_name` VARCHAR(50) NULL,
  `description` VARCHAR(255) NULL,
  `intro_image_url` VARCHAR(128) NULL,
  `state` CHAR(1) NULL COMMENT 'A - Active\nC - Closed\nZ - Archive',
  `org_id` TINYINT(4) NULL,
  `last_updated_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`project_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`project_members` (
  `proj_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `role` CHAR(1) NULL,
  `access_type` CHAR(1) NULL COMMENT 'R - Read only\nE - Read and Edit/Comment\nS - Read and Share\nX - Read, Edit/Comment, Share',
  `group_type` CHAR(1) NULL COMMENT 'I - Internal\nE - External',
  PRIMARY KEY (`proj_id`, `user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefacts` (
  `artefact_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NULL,
  `artefact_title` VARCHAR(50) NULL,
  `description` VARCHAR(255) NULL,
  `latest_version_id` INT UNSIGNED NULL,
  `state` CHAR(1) NULL DEFAULT 'O' COMMENT 'O - Open \nD - Delete \nA - Archive',
  `artefact_type` CHAR(1) NULL COMMENT 'Type of the document examples.\nI - IXD\nU - UID\nS - Support Document\nP - Primary Deliverable\nE - External Document URL',
  `replace_ref_id` INT NULL COMMENT 'Artefact id with which the artefact has been replaced',
  `linked_id` INT NULL COMMENT 'This is unique id which is used to get all artefacts of same link.',
  PRIMARY KEY (`artefact_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_versions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_versions` (
  `artefact_ver_id` INT NOT NULL AUTO_INCREMENT,
  `artefact_id` INT NOT NULL,
  `version_no` INT NOT NULL,
  `masked_artefact_version_id` VARCHAR(100) NULL,
  `version_label` VARCHAR(125) NULL,
  `created_by` INT NULL,
  `created_date` TIMESTAMP NULL,
  `document_path` VARCHAR(128) NULL,
  `MIME_type` VARCHAR(45) NULL,
  `file_size` INT NULL,
  `state` CHAR(1) NULL COMMENT 'Need to get info',
  `shared` BINARY(1) NULL COMMENT '0 - non-shared\n1 - shared (for review)',
  PRIMARY KEY (`artefact_ver_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`auth_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`auth_session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sid` VARCHAR(45) NULL,
  `user_id` VARCHAR(45) NULL,
  `client_id` VARCHAR(45) NULL,
  `expiry` INT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_shared_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_shared_members` (
  `artefact_ver_id` INT NOT NULL,
  `artefact_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `access_type` CHAR(1) NULL COMMENT 'R - Read only\nE - Read and Edit/Comment\nS - Read and Share\nX - Read, Edit/Comment, Share',
  `band_percentage` INT NULL,
  `shared_date` TIMESTAMP NULL,
  `shared_by` INT NULL,
  `while_creation` TINYINT(1) NULL DEFAULT 1,
  PRIMARY KEY (`artefact_ver_id`, `user_id`, `artefact_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_comment_threads`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_comment_threads` (
  `comment_thread_id` INT NOT NULL AUTO_INCREMENT,
  `artefact_id` INT NOT NULL,
  `artefact_ver_id` INT NOT NULL,
  `comment_thread_by` INT NULL,
  `page_no` TINYINT(4) NULL COMMENT 'Page number on which comment is created',
  `posx` VARCHAR(25) NULL COMMENT 'X- Position of document page',
  `posy` VARCHAR(25) NULL COMMENT 'Y- Position of document page',
  `category` CHAR(1) NULL COMMENT 'I - IxD\nU - UID\nT - Typo\nP - Persona',
  `severity` CHAR(1) NULL COMMENT 'R - High\nB - Medium\nG - Low',
  `is_private` TINYINT(1) NULL DEFAULT 0,
  `state` CHAR(1) NULL COMMENT 'O - Open\nR - Resolved\nV - Verified\nC - Closed\nX - Re-opened',
  `comment_type` CHAR(1) NULL COMMENT 'G - Global comment\nI - Inline comment\n',
  PRIMARY KEY (`comment_thread_id`, `artefact_id`, `artefact_ver_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`tags` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag_name` VARCHAR(45) NULL,
  `org_id` INT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_tags` (
  `artefact_id` INT NOT NULL,
  `tag_id` INT NULL,
  `created_by` INT NULL,
  `created_date` TIMESTAMP NULL,
  PRIMARY KEY (`artefact_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_ref_docs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_ref_docs` (
  `ref_doc_id` INT NOT NULL AUTO_INCREMENT,
  `artefact_ver_id` INT NULL,
  `artefact_id` INT NULL,
  `created_by` INT NULL,
  `created_date` TIMESTAMP NULL,
  `ref_document_path` VARCHAR(128) NULL,
  PRIMARY KEY (`ref_doc_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`comment_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`comment_history` (
  `comment_id` INT NOT NULL,
  `comment_severity` INT NULL,
  `comment_state` CHAR(1) NULL,
  `comment_category` CHAR(1) NULL,
  `comment_thread_id` INT NULL,
  `modified_date` TIMESTAMP NULL,
  `modified_by` INT NULL,
  PRIMARY KEY (`comment_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `comment_thread_id` INT NULL,
  `comment_by` INT NULL,
  `description` VARCHAR(1024) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `markup` VARCHAR(128) NULL COMMENT 'Need to get info',
  `state` CHAR(1) NULL COMMENT 'Need to get info',
  PRIMARY KEY (`comment_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`notifications` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `message` VARCHAR(50) NULL,
  `project_id` INT NULL,
  `notification_by` INT NULL,
  `notification_date` TIMESTAMP NULL,
  `notification_type` CHAR(1) NULL COMMENT 'M - Meeting\nC - Comment\nS - Share',
  `notification_ref_id` INT NULL COMMENT 'this field contains the value of ‘meeting_id’ if the notification_type is M\n‘artefact_ver_id’ if notification_type is ‘C’ or ’S’',
  `notification_state` CHAR(1) NULL COMMENT 'A - archive\nR - read\nU - unread',
  PRIMARY KEY (`notification_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`meetings` (
  `meeting_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NULL,
  `meeting_time` TIMESTAMP NULL,
  `meeting_agenda` VARCHAR(255) NULL,
  `meeting_title` VARCHAR(45) NULL,
  `created_by` INT NULL,
  `meeting_on_artefact_id` INT NULL,
  `venue` VARCHAR(125) NULL,
  `google_meeting_ref_id` VARCHAR(250) NULL,
  `google_meeting_ref_url` VARCHAR(250) NULL,
  PRIMARY KEY (`meeting_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`meeting_notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`meeting_notes` (
  `meeting_id` INT NOT NULL,
  `participant_id` INT NOT NULL,
  `participant_notes` VARCHAR(255) NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `is_public` INT(1) NULL COMMENT '0 - Private\n1 - Public',
  PRIMARY KEY (`meeting_id`, `participant_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`meeting_participents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`meeting_participents` (
  `meeting_id` INT NOT NULL,
  `participent_id` INT NOT NULL,
  `invitation_date` TIMESTAMP NULL,
  `invited_by` INT NULL,
  PRIMARY KEY (`meeting_id`, `participent_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`project_activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`project_activity` (
  `activity_id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT NOT NULL,
  `logged_by` INT NULL COMMENT 'User Id of the logged person',
  `logged_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `performed_on` CHAR(1) NULL COMMENT 'Activity performed on \nEx: A - Artefact\n      M - Meeting Invitation\n      U - User',
  `activity_type` CHAR(1) NULL COMMENT 'Type of activity performed\nEx: N - New\n       R - Remove\n       U - Update\n       H - Hold\n       C - Comment\n       S - Share',
  `performed_on_id` INT NULL COMMENT 'Ex: Meeting Id/ Artefact ID/ User Id\n     ',
  PRIMARY KEY (`activity_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kenseo`.`artefact_links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kenseo`.`artefact_links` (
  `linked_from_id` INT NOT NULL,
  `linked_to_id` INT NOT NULL,
  `linked_id` INT NOT NULL COMMENT 'Need to get info',
  `linked_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `while_creation` TINYINT(1) NULL DEFAULT 1)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
