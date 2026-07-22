import { config } from "./config";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiFailure {
  success: false;
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status?: number,
    errors?: Record<string, string[]>
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const headers = new Headers(options.headers);

    headers.set("Content-Type", "application/json");

    if (options.token) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }

    const response = await fetch(
      `${config.api.baseUrl}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    let payload: unknown = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const error = payload as Partial<ApiFailure> | null;

      throw new ApiError(
        error?.message ?? "Something went wrong.",
        response.status,
        error?.errors
      );
    }

    return payload as T;
  }

  get<T>(url: string, token?: string) {
    return this.request<T>(url, {
      method: "GET",
      token,
    });
  }

  post<T>(
    url: string,
    body: unknown,
    token?: string
  ) {
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      token,
    });
  }

  put<T>(
    url: string,
    body: unknown,
    token?: string
  ) {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      token,
    });
  }

  patch<T>(
    url: string,
    body: unknown,
    token?: string
  ) {
    return this.request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      token,
    });
  }

  delete<T>(
    url: string,
    token?: string
  ) {
    return this.request<T>(url, {
      method: "DELETE",
      token,
    });
  }
}

export const apiClient = new ApiClient();