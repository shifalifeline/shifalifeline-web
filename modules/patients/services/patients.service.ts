import { apiClient } from "@/lib/apiClient";
import { API } from "@/lib/apiEndpoints";

import type {
  ApiResponse,
} from "@/types/api.types";

import type {
  Patient,
  PatientListResponse,
  CreatePatientRequest,
  UpdatePatientRequest,
} from "../../../types/patient.types";

export const PatientsService = {
  async getPatients(): Promise<PatientListResponse> {
    const response = await apiClient.get<
      ApiResponse<PatientListResponse>
    >(API.PATIENTS.LIST);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async getPatientById(id: string): Promise<Patient> {
    const response = await apiClient.get<
      ApiResponse<Patient>
    >(API.PATIENTS.DETAILS(id));

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async createPatient(
    patient: CreatePatientRequest
  ): Promise<Patient> {
    const response = await apiClient.post<
      ApiResponse<Patient>
    >(API.PATIENTS.LIST, patient);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async updatePatient(
    patient: UpdatePatientRequest
  ): Promise<Patient> {
    const response = await apiClient.put<
      ApiResponse<Patient>
    >(
      API.PATIENTS.DETAILS(patient.id),
      patient
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async deletePatient(id: string): Promise<void> {
    const response = await apiClient.delete<
      ApiResponse<null>
    >(API.PATIENTS.DETAILS(id));

    if (!response.success) {
      throw new Error(response.message);
    }
  },
};