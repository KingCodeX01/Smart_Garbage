-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `confirm_password` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Garbage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pickup_date` DATETIME(3) NOT NULL,
    `pickup_time` VARCHAR(191) NOT NULL,
    `phone_no` INTEGER NOT NULL,
    `alt_phone_no` INTEGER NULL,
    `type` VARCHAR(191) NOT NULL,
    `fk_user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `acc_type` VARCHAR(191) NOT NULL DEFAULT 'Manager',
    `is_verified` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Works` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `banner_image` VARCHAR(191) NOT NULL,
    `banner_alt` VARCHAR(191) NULL,
    `banner_title` VARCHAR(191) NOT NULL,
    `banner_desc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gprice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trash_name` VARCHAR(191) NOT NULL,
    `trash_image` VARCHAR(191) NOT NULL,
    `trash_description` VARCHAR(191) NULL,
    `trash_category` ENUM('Paper', 'Glass_and_Plastic', 'Metal_and_Steel', 'E_Waste', 'Brass', 'PET_bottle', 'Others') NOT NULL,
    `trash_price` INTEGER NOT NULL,
    `trash_unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `add_price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('Paper', 'Glass_and_Plastic', 'Metal_and_Steel', 'E_Waste', 'Brass', 'PET_bottle', 'Others') NOT NULL,
    `images` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Garbage` ADD CONSTRAINT `Garbage_fk_user_id_fkey` FOREIGN KEY (`fk_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
