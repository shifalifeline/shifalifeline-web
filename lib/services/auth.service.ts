export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  mobile: string;
  email?: string;
  password: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export async function login(
  data: LoginRequest
) {
  console.log("Login", data);

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return {
    success: true,
  };
}

export async function register(
  data: RegisterRequest
) {
  console.log("Register", data);

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return {
    success: true,
  };
}

export async function forgotPassword(
  data: ForgotPasswordRequest
) {
  console.log("Forgot Password", data);

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  return {
    success: true,
  };
}