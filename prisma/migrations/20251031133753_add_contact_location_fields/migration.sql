/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `EscortProfile` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `EscortProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EscortProfile" DROP COLUMN "contactEmail",
DROP COLUMN "contactPhone",
ADD COLUMN     "incall" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "line" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "onlyfans" TEXT,
ADD COLUMN     "outcall" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "signal" TEXT,
ADD COLUMN     "snapchat" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "travelAvailable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "viber" TEXT,
ADD COLUMN     "wechat" TEXT,
ADD COLUMN     "whatsapp" TEXT;
