-- Paste your CREATE TABLE statements here when deploying on server.
-- This file is intentionally left blank in repo by default.

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema demo_iot
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema demo_iot
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `demo_iot` DEFAULT CHARACTER SET utf8 ;
USE `demo_iot` ;

-- -----------------------------------------------------
-- Table `demo_iot`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demo_iot`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fullname` VARCHAR(45) NOT NULL,
  `cccd` DECIMAL(12) NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone` INT NULL,
  `creat_at` DATE NOT NULL,
  `status` ENUM('active', 'deactive') NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `cccd_UNIQUE` (`cccd` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `demo_iot`.`device`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demo_iot`.`device` (
  `device_id` INT NOT NULL,
  `devicename` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `status` ENUM('active', 'deactive') NULL,
  `user_device_asignment_id` INT NOT NULL,
  PRIMARY KEY (`device_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `demo_iot`.`device_authorization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `demo_iot`.`device_authorization` (
  `device_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `granted_at` DATE NULL,
  `granted_by` DATE NULL,
  `expired_at` DATE NULL,
  PRIMARY KEY (`device_id`, `user_id`),
  INDEX `fk_device_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_device_has_user_device_idx` (`device_id` ASC) VISIBLE,
  CONSTRAINT `fk_device_has_user_device`
    FOREIGN KEY (`device_id`)
    REFERENCES `demo_iot`.`device` (`device_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_device_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `demo_iot`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
