-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "doctorCode" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "experience" INTEGER,
    "registrationNumber" TEXT,
    "consultationFee" DOUBLE PRECISION,
    "bio" TEXT,
    "photoUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorCode_key" ON "Doctor"("doctorCode");

-- CreateIndex
CREATE INDEX "Doctor_doctorCode_idx" ON "Doctor"("doctorCode");

-- CreateIndex
CREATE INDEX "Doctor_specialty_idx" ON "Doctor"("specialty");

-- CreateIndex
CREATE INDEX "Doctor_status_idx" ON "Doctor"("status");
