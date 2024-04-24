-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_group_id_fkey`;

-- DropIndex
DROP INDEX `Post_questionContent_content_idx` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `title` TEXT NOT NULL,
    MODIFY `questionContent` TEXT NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `post_questionContent_title_idx` ON `post`(`questionContent`, `title`);

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
