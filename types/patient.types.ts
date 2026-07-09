export type Gender = "Male" | "Female" | "Other";

export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;
  uhid: string;

  firstName: string;
  lastName: string;

  phone: string;
  email?: string;

  gender: Gender;
  age: number;

  dateOfBirth?: string;
  bloodGroup?: string;

  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;

  emergencyContactName?: string;
  emergencyContactPhone?: string;

  status: PatientStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface PatientStats {
  totalPatients: number;
  activePatients: number;
  todayRegistrations: number;
  appointmentsToday: number;
}

export interface PatientListResponse {
  patients: Patient[];
  stats: PatientStats;
}

export interface CreatePatientRequest
  extends Omit<
    Patient,
    "id" | "uhid" | "createdAt" | "updatedAt"
  > {}

export interface UpdatePatientRequest
  extends Partial<CreatePatientRequest> {
  id: string;
}