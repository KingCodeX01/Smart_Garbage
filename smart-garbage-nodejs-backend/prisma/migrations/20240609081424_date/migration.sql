/*
  Warnings:

  - You are about to alter the column `pickup_date` on the `garbage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `garbage` MODIFY `pickup_date` DATETIME(3) NOT NULL;
