-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PENDING', 'ACTIVE', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PackRarity" AS ENUM ('DEFAULT', 'RARE', 'EPIC', 'MYTHIC');

-- AlterTable
ALTER TABLE "game_log" ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "user_card" ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "pack" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" "PackRarity" NOT NULL,
    "guaranteed" JSONB NOT NULL,
    "chance_bonus" JSONB NOT NULL,

    CONSTRAINT "pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pack" (
    "id" BIGSERIAL NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "user_id" BIGINT NOT NULL,
    "pack_id" BIGINT NOT NULL,

    CONSTRAINT "user_pack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_pack" ADD CONSTRAINT "user_pack_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pack" ADD CONSTRAINT "user_pack_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
