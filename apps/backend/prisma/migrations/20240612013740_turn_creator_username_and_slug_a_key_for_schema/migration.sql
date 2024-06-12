/*
  Warnings:

  - You are about to drop the column `creator_id` on the `lists` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creator_username,slug]` on the table `lists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_username` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_creator_id_fkey";

-- AlterTable
ALTER TABLE "lists" DROP COLUMN "creator_id",
ADD COLUMN     "creator_username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lists_creator_username_slug_key" ON "lists"("creator_username", "slug");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_creator_username_fkey" FOREIGN KEY ("creator_username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
