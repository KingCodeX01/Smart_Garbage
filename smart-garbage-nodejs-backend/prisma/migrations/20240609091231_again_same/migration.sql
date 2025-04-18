/*
  Warnings:

  - Added the required column `fk_user_id` to the `Garbage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `garbage` ADD COLUMN `fk_user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Garbage` ADD CONSTRAINT `Garbage_fk_user_id_fkey` FOREIGN KEY (`fk_user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
