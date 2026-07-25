export interface Doctor {
  id: string;
  doctorCode: string;

  firstName: string;
  lastName: string;

  specialty: string;
  qualification: string;

  experience?: number | null;
  registrationNumber?: string | null;
  consultationFee?: number | null;

  bio?: string | null;
  photoUrl?: string | null;

  status: string;

  createdAt: string;
  updatedAt: string;
}

export interface DoctorStats {
  totalDoctors: number;
  activeDoctors: number;
  specialties: number;
}

export interface CreateDoctorRequest {
  firstName: string;
  lastName: string;

  specialty: string;
  qualification: string;

  experience?: number;
  registrationNumber?: string;

  consultationFee?: number;

  bio?: string;
  photoUrl?: string;

  status: string;
}

export interface UpdateDoctorRequest
  extends Partial<CreateDoctorRequest> {
  id: string;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  stats: DoctorStats;
}