/*
  Warnings:

  - Added the required column `createdByUserId` to the `Fueling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fueling" ADD COLUMN     "createdByUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "createdByUserId" INTEGER NOT NULL;
