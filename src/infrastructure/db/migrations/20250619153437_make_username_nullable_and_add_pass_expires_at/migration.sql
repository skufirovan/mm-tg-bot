-- AlterTable
ALTER TABLE "user" ADD COLUMN     "pass_expires_at" TIMESTAMP(3),
ALTER COLUMN "username" DROP NOT NULL;
