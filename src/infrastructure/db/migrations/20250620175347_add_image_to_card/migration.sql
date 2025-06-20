/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "card" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "card_image_key" ON "card"("image");
