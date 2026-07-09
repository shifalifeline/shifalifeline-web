import type { PatientListResponse } from "../../../types/patient.types";

export const PatientsService = {
  async getPatients(): Promise<PatientListResponse> {
    throw new Error("Backend not connected.");
  },

  async getPatientById(_: string) {
    throw new Error("Backend not connected.");
  },

  async createPatient() {
    throw new Error("Backend not connected.");
  },

  async updatePatient() {
    throw new Error("Backend not connected.");
  },

  async deletePatient(_: string) {
    throw new Error("Backend not connected.");
  },
};