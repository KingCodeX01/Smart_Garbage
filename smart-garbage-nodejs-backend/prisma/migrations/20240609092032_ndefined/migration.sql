/*
  Warnings:

  - You are about to drop the column `fk_user_id` on the `garbage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `garbage` DROP FOREIGN KEY `Garbage_fk_user_id_fkey`;

-- AlterTable
ALTER TABLE `garbage` DROP COLUMN `fk_user_id`;
