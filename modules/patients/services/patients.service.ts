import type {
  Patient,
  PatientListResponse,
} from "../../../types/patient.types";

const mockPatients: Patient[] = [
  {
    id: "1",
    uhid: "SH000001",
    firstName: "Amit",
    lastName: "Roy",
    phone: "9876543210",
    gender: "Male",
    age: 35,
    status: "Active",
  },
  {
    id: "2",
    uhid: "SH000002",
    firstName: "Priya",
    lastName: "Sen",
    phone: "9123456780",
    gender: "Female",
    age: 29,
    status: "Active",
  },
  {
    id: "3",
    uhid: "SH000003",
    firstName: "Rahul",
    lastName: "Das",
    phone: "9988776655",
    gender: "Male",
    age: 44,
    status: "Inactive",
  },
];

export const PatientsService = {
  async getPatients(): Promise<PatientListResponse> {
    return {
      patients: mockPatients,
      stats: {
        totalPatients: mockPatients.length,
        activePatients: mockPatients.filter(
          (patient) => patient.status === "Active"
        ).length,
        todayRegistrations: 1,
        appointmentsToday: 2,
      },
    };
  },

  async getPatientById(id: string): Promise<Patient | undefined> {
    return mockPatients.find((patient) => patient.id === id);
  },

  async createPatient(_: Patient): Promise<void> {
    // Backend integration will be added later.
  },

  async updatePatient(_: Patient): Promise<void> {
    // Backend integration will be added later.
  },

  async deletePatient(_: string): Promise<void> {
    // Backend integration will be added later.
  },
};