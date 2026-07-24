/*
  Warnings:

  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uhid]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uhid` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "name",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "emergencyContact" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "pinCode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Active',
ADD COLUMN     "uhid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_uhid_key" ON "Patient"("uhid");

-- CreateIndex
CREATE INDEX "Patient_uhid_idx" ON "Patient"("uhid");

-- CreateIndex
CREATE INDEX "Patient_phone_idx" ON "Patient"("phone");

-- CreateIndex
CREATE INDEX "Patient_status_idx" ON "Patient"("status");
