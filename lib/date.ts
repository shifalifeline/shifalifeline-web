export function formatDate(
  value: string | Date,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function formatDateTime(
  value: string | Date,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatTime(
  value: string | Date,
  locale = "en-IN"
) {
  return new Intl.DateTimeFormat(locale, {
    timeStyle: "short",
  }).format(new Date(value));
}

export function todayISO() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export function nowISO() {
  return new Date().toISOString();
}