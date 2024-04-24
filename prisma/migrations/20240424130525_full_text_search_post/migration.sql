-- DropIndex
DROP INDEX `Post_questionContent_title_idx` ON `post`;

-- CreateIndex
CREATE FULLTEXT INDEX `Post_questionContent_content_idx` ON `Post`(`questionContent`, `content`);
