/*
  Warnings:

  - Changed the type of `session` on the `BookingSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SessionPreference" AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'NO_PREFERENCE');

-- CreateEnum
CREATE TYPE "ConsultationMode" AS ENUM ('PHYSICAL', 'VIDEO');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "consultationMode" "ConsultationMode",
ADD COLUMN     "doctorId" TEXT,
ADD COLUMN     "preferredDate" TIMESTAMP(3),
ADD COLUMN     "preferredSession" "SessionPreference",
ADD COLUMN     "reasonForVisit" TEXT;

-- AlterTable
ALTER TABLE "BookingSchedule" DROP COLUMN "session",
ADD COLUMN     "session" "SessionPreference" NOT NULL;

-- CreateTable
CREATE TABLE "BookingAttachment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingAttachment_bookingId_idx" ON "BookingAttachment"("bookingId");

-- CreateIndex
CREATE INDEX "Booking_doctorId_idx" ON "Booking"("doctorId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingAttachment" ADD CONSTRAINT "BookingAttachment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
