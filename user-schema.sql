CREATE TABLE `user_management_system`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(15) NOT NULL, -- Adjusted to VARCHAR(15) for phone numbers
  `comment` TEXT NOT NULL,
  `status` VARCHAR(10) NOT NULL DEFAULT 'active', -- Specified length for VARCHAR
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
