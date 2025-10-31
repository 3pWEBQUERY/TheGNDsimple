/*
  Warnings:

  - You are about to drop the column `location` on the `EscortProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EscortProfile" DROP COLUMN "location",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "gallery" TEXT[],
ADD COLUMN     "services" JSONB,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileBio" TEXT,
ADD COLUMN     "profileGallery" TEXT[];
