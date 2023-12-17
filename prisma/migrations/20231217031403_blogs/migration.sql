/*
  Warnings:

  - A unique constraint covering the columns `[tagList]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "tagList" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Blog_tagList_key" ON "Blog"("tagList");
