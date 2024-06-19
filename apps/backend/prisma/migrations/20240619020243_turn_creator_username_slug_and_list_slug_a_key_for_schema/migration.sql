/*
  Warnings:

  - You are about to drop the column `creator_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `list_id` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creator_username,list_slug,slug]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_username` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `list_slug` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_list_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "creator_id",
DROP COLUMN "list_id",
ADD COLUMN     "creator_username" TEXT NOT NULL,
ADD COLUMN     "list_slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "items_creator_username_list_slug_slug_key" ON "items"("creator_username", "list_slug", "slug");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_creator_username_fkey" FOREIGN KEY ("creator_username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_list_slug_creator_username_fkey" FOREIGN KEY ("list_slug", "creator_username") REFERENCES "lists"("slug", "creator_username") ON DELETE RESTRICT ON UPDATE CASCADE;
