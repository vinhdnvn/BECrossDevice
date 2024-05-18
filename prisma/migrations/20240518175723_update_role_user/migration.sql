/*
  Warnings:

  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tutor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `tutor` DROP FOREIGN KEY `Tutor_user_id_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `Class_int` INTEGER NULL,
    ADD COLUMN `Point_int` INTEGER NULL,
    ADD COLUMN `Rating_float` DOUBLE NULL;

-- DropTable
DROP TABLE `student`;

-- DropTable
DROP TABLE `tutor`;
