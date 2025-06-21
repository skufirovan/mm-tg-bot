/*
  Warnings:

  - You are about to drop the column `name` on the `pack` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,pack_id]` on the table `user_pack` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pack" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "user_card" ADD COLUMN     "dupes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lvl" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "user_pack_user_id_pack_id_key" ON "user_pack"("user_id", "pack_id");
