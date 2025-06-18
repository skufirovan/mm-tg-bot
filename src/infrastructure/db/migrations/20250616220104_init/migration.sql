-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('DEFAULT', 'AUTOGRAPH', 'SEASON', 'LIMITED', 'LEGENDARY');

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "account_id" BIGINT NOT NULL,
    "username" TEXT NOT NULL,
    "has_pass" BOOLEAN NOT NULL DEFAULT false,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" BIGSERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "vocabulary" INTEGER NOT NULL,
    "fame" INTEGER NOT NULL,
    "originality" INTEGER NOT NULL,
    "versatility" INTEGER NOT NULL,
    "live_performance" INTEGER NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_card" (
    "id" BIGSERIAL NOT NULL,
    "acquired_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT NOT NULL,
    "card_id" BIGINT NOT NULL,

    CONSTRAINT "user_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_log" (
    "id" BIGSERIAL NOT NULL,
    "played_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player1_id" BIGINT NOT NULL,
    "player2_id" BIGINT NOT NULL,
    "winner_id" BIGINT NOT NULL,
    "loser_id" BIGINT NOT NULL,

    CONSTRAINT "game_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_account_id_key" ON "user"("account_id");

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_card" ADD CONSTRAINT "user_card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_log" ADD CONSTRAINT "game_log_player1_id_fkey" FOREIGN KEY ("player1_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_log" ADD CONSTRAINT "game_log_player2_id_fkey" FOREIGN KEY ("player2_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_log" ADD CONSTRAINT "game_log_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_log" ADD CONSTRAINT "game_log_loser_id_fkey" FOREIGN KEY ("loser_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
