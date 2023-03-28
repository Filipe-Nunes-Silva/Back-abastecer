/*
  Warnings:

  - Added the required column `createByUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createByUser" INTEGER NOT NULL;
