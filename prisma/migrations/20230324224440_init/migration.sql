-- CreateTable
CREATE TABLE "Vehicles" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "potency" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supply" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "vehiclesId" INTEGER NOT NULL,

    CONSTRAINT "Supply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Supply" ADD CONSTRAINT "Supply_vehiclesId_fkey" FOREIGN KEY ("vehiclesId") REFERENCES "Vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
