/*
  Warnings:

  - You are about to drop the column `createdByUserId` on the `Fueling` table. All the data in the column will be lost.
  - You are about to drop the column `createdByUserId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Fueling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fueling" DROP COLUMN "createdByUserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "createdByUserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fueling" ADD CONSTRAINT "Fueling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
