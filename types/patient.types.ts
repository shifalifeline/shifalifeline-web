export type Gender = "Male" | "Female" | "Other" | "UNKNOWN";

export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;

  uhid: string;

  firstName: string;
  lastName: string;

  phone: string;
  email?: string | null;

  gender: Gender;

  dateOfBirth?: string | null;
  bloodGroup?: string | null;

  address?: string | null;
  city?: string | null;
  state?: string | null;
  pinCode?: string | null;

  emergencyContact?: string | null;

  status: PatientStatus;

  createdAt: string;
  updatedAt: string;
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

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;

  phone: string;
  email?: string;

  gender: Gender;

  dateOfBirth?: string;
  bloodGroup?: string;

  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;

  emergencyContact?: string;

  status?: PatientStatus;
}

export interface UpdatePatientRequest
  extends Partial<CreatePatientRequest> {
  id: string;
}