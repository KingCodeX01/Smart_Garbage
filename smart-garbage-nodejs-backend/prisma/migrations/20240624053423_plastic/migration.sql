/*
  Warnings:

  - The values [Glass_and_Plastic,Metal_and_Steel] on the enum `Gprice_trash_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `gprice` MODIFY `trash_category` ENUM('Paper', 'Glass', 'Metal', 'E_Waste', 'Brass', 'PET_bottle', 'Others') NOT NULL;
