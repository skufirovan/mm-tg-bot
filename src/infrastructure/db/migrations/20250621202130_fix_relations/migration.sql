/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_card` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `user_card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_card" DROP CONSTRAINT "user_card_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_pack" DROP CONSTRAINT "user_pack_user_id_fkey";

-- AlterTable
ALTER TABLE "user_card" DROP COLUMN "user_id",
ADD COLUMN     "account_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "user"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pack" ADD CONSTRAINT "user_pack_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
