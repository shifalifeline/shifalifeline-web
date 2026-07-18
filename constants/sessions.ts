export const SESSIONS = [
  "Morning",
  "Afternoon",
  "Evening",
  "No Preference",
] as const;

export type Session =
  (typeof SESSIONS)[number];