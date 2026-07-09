import type {
  Patient,
  PatientListResponse,
  CreatePatientRequest,
  UpdatePatientRequest,
} from "../../../types/patient.types";

const mockPatients: Patient[] = [
  {
    id: "1",
    uhid: "SH000001",
    firstName: "Amit",
    lastName: "Roy",
    phone: "9876543210",
    email: "amit.roy@example.com",
    gender: "Male",
    age: 35,
    bloodGroup: "B+",
    city: "Kolkata",
    state: "West Bengal",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    uhid: "SH000002",
    firstName: "Priya",
    lastName: "Sen",
    phone: "9123456780",
    email: "priya.sen@example.com",
    gender: "Female",
    age: 29,
    bloodGroup: "O+",
    city: "Kolkata",
    state: "West Bengal",
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    uhid: "SH000003",
    firstName: "Rahul",
    lastName: "Das",
    phone: "9988776655",
    email: "rahul.das@example.com",
    gender: "Male",
    age: 44,
    bloodGroup: "A+",
    city: "Howrah",
    state: "West Bengal",
    status: "Inactive",
    createdAt: new Date().toISOString(),
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

  async createPatient(
    patient: CreatePatientRequest
  ): Promise<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: crypto.randomUUID(),
      uhid: `SH${String(mockPatients.length + 1).padStart(6, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockPatients.push(newPatient);

    return newPatient;
  },

  async updatePatient(
    patient: UpdatePatientRequest
  ): Promise<Patient | null> {
    const index = mockPatients.findIndex(
      (item) => item.id === patient.id
    );

    if (index === -1) {
      return null;
    }

    mockPatients[index] = {
      ...mockPatients[index],
      ...patient,
      updatedAt: new Date().toISOString(),
    };

    return mockPatients[index];
  },

  async deletePatient(id: string): Promise<boolean> {
    const index = mockPatients.findIndex(
      (patient) => patient.id === id
    );

    if (index === -1) {
      return false;
    }

    mockPatients.splice(index, 1);

    return true;
  },
};