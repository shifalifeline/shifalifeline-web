export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const mobileRegex =
  /^[6-9]\d{9}$/;

export function validateLogin(
  identifier: string,
  password: string
) {
  const errors: Record<string, string> = {};

  if (!identifier.trim()) {
    errors.identifier = "Mobile number or email is required.";
  } else {
    const value = identifier.trim();

    const isEmail = emailRegex.test(value);
    const isMobile = mobileRegex.test(value);

    if (!isEmail && !isMobile) {
      errors.identifier =
        "Enter a valid mobile number or email.";
    }
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateRegister(data: {
  fullName: string;
  mobile: string;
  email?: string;
  password: string;
  confirmPassword: string;
}) {
  const errors: Record<string, string> = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!mobileRegex.test(data.mobile)) {
    errors.mobile = "Enter a valid mobile number.";
  }

  if (
    data.email &&
    data.email.trim() &&
    !emailRegex.test(data.email)
  ) {
    errors.email = "Enter a valid email.";
  }

  if (data.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
}

export function validateForgotPassword(
  value: string
) {
  const errors: Record<string, string> = {};

  if (!value.trim()) {
    errors.identifier =
      "Mobile number or email is required.";
    return errors;
  }

  const isEmail = emailRegex.test(value);
  const isMobile = mobileRegex.test(value);

  if (!isEmail && !isMobile) {
    errors.identifier =
      "Enter a valid mobile number or email.";
  }

  return errors;
}