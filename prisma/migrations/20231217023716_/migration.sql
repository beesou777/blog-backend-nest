/*
  Warnings:

  - You are about to drop the column `blogImages` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `decrement` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `increment` on the `Blog` table. All the data in the column will be lost.
  - Added the required column `body` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upvoted` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "blogImages",
DROP COLUMN "decrement",
DROP COLUMN "increment",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tagList" TEXT[],
ADD COLUMN     "upvoted" BOOLEAN NOT NULL;
