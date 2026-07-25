import { DoctorsService } from "../services/doctors.service";

export function useDoctors() {
  return {
    getDoctors: DoctorsService.getDoctors,
    getDoctorById: DoctorsService.getDoctorById,
    createDoctor: DoctorsService.createDoctor,
    updateDoctor: DoctorsService.updateDoctor,
    deleteDoctor: DoctorsService.deleteDoctor,
  };
}