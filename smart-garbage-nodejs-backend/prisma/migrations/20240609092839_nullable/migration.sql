-- AlterTable
ALTER TABLE `garbage` ADD COLUMN `fk_user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Garbage` ADD CONSTRAINT `Garbage_fk_user_id_fkey` FOREIGN KEY (`fk_user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
