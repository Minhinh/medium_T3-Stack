/*
  Warnings:

  - You are about to drop the column `refresh_token_expires_in` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refresh_token_expires_in";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageUrl",
DROP COLUMN "slug";
