/*
  Warnings:

  - You are about to drop the column `userId` on the `Vehicles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicles" DROP CONSTRAINT "Vehicles_userId_fkey";

-- AlterTable
ALTER TABLE "Vehicles" DROP COLUMN "userId";
