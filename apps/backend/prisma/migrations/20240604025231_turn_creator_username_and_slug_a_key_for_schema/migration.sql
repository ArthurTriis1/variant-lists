/*
  Warnings:

  - You are about to drop the column `creator_id` on the `schemas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creator_username,slug]` on the table `schemas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creator_username` to the `schemas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "schemas" DROP CONSTRAINT "schemas_creator_id_fkey";

-- DropIndex
DROP INDEX "schemas_slug_key";

-- AlterTable
ALTER TABLE "schemas" DROP COLUMN "creator_id",
ADD COLUMN     "creator_username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "schemas_creator_username_slug_key" ON "schemas"("creator_username", "slug");

-- AddForeignKey
ALTER TABLE "schemas" ADD CONSTRAINT "schemas_creator_username_fkey" FOREIGN KEY ("creator_username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
