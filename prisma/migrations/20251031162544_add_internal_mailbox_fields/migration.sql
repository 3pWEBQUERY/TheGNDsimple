/*
  Warnings:

  - A unique constraint covering the columns `[internalEmailHandle]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "internalEmailHandle" TEXT,
ADD COLUMN     "internalEmailVerificationToken" TEXT,
ADD COLUMN     "internalEmailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "internalEmailVerifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_internalEmailHandle_key" ON "User"("internalEmailHandle");
