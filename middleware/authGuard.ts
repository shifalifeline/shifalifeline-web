import type { UserRole } from "@/types/auth.types";

export interface GuardOptions {
  userRole?: UserRole;
  allowedRoles: UserRole[];
}

export function authGuard({
  userRole,
  allowedRoles,
}: GuardOptions): boolean {
  if (!userRole) {
    return false;
  }

  if (userRole === "ADMIN") {
    return true;
  }

  return allowedRoles.includes(userRole);
}