export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  todayRegistrations: number;
  appointmentsToday: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
}