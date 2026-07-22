export const config = {
  app: {
    name: "SHIFA LIFE LINE",
    version: "0.26.0",
  },

  api: {
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "",

    timeout: 30000,
  },

  auth: {
    tokenKey: "shifa_token",
    refreshTokenKey: "shifa_refresh_token",
    userKey: "shifa_user",
  },

  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
} as const;