import { apiClient } from "@/lib/apiClient";
import { API } from "@/lib/apiEndpoints";

import type {
  ApiResponse,
} from "@/types/api.types";

import type {
  Doctor,
  DoctorsResponse,
  CreateDoctorRequest,
  UpdateDoctorRequest,
} from "../../../types/doctor.types";

export const DoctorsService = {
  async getDoctors(): Promise<DoctorsResponse> {
    const response = await apiClient.get<
      ApiResponse<DoctorsResponse>
    >(API.DOCTORS.LIST);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async getDoctorById(id: string): Promise<Doctor> {
    const response = await apiClient.get<
      ApiResponse<Doctor>
    >(API.DOCTORS.DETAILS(id));

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async createDoctor(
    doctor: CreateDoctorRequest
  ): Promise<Doctor> {
    const response = await apiClient.post<
      ApiResponse<Doctor>
    >(API.DOCTORS.LIST, doctor);

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async updateDoctor(
    doctor: UpdateDoctorRequest
  ): Promise<Doctor> {
    const response = await apiClient.put<
      ApiResponse<Doctor>
    >(
      API.DOCTORS.DETAILS(doctor.id),
      doctor
    );

    if (!response.success) {
      throw new Error(response.message);
    }

    return response.data;
  },

  async deleteDoctor(id: string): Promise<void> {
    const response = await apiClient.delete<
      ApiResponse<null>
    >(API.DOCTORS.DETAILS(id));

    if (!response.success) {
      throw new Error(response.message);
    }
  },
};