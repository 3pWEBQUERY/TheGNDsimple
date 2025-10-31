-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEscort" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "EscortProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT,
    "location" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EscortProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EscortProfile_userId_key" ON "EscortProfile"("userId");

-- AddForeignKey
ALTER TABLE "EscortProfile" ADD CONSTRAINT "EscortProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
