export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    PROFILE: "/api/auth/profile",
    REFRESH: "/api/auth/refresh",
  },

  BOOKINGS: {
    LIST: "/api/bookings",
    CREATE: "/api/bookings",
    DETAILS: (id: string) => `/api/bookings/${id}`,
    UPDATE: (id: string) => `/api/bookings/${id}`,
    DELETE: (id: string) => `/api/bookings/${id}`,
    QUOTATION: (id: string) => `/api/bookings/${id}/quotation`,
    PAYMENT: (id: string) => `/api/bookings/${id}/payment`,
    SCHEDULE: (id: string) => `/api/bookings/${id}/schedule`,
    STATUS: (id: string) => `/api/bookings/${id}/status`,
  },

  PATIENTS: {
    LIST: "/api/patients",
    DETAILS: (id: string) => `/api/patients/${id}`,
  },

  DOCTORS: {
    LIST: "/api/doctors",
    DETAILS: (id: string) => `/api/doctors/${id}`,
  },

  LABORATORY: {
    TESTS: "/api/laboratory/tests",
    REPORTS: (id: string) => `/api/laboratory/reports/${id}`,
  },

  PHARMACY: {
    PRODUCTS: "/api/pharmacy/products",
    ORDERS: "/api/pharmacy/orders",
  },
} as const;