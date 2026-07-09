export interface Patient {
  id: string;
  uhid: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  status: "Active" | "Inactive";
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