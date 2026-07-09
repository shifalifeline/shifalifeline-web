import { PatientsService } from "../services/patients.service";

export function usePatients() {
  return {
    getPatients: PatientsService.getPatients,
    getPatientById: PatientsService.getPatientById,
    createPatient: PatientsService.createPatient,
    updatePatient: PatientsService.updatePatient,
    deletePatient: PatientsService.deletePatient,
  };
}