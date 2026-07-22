export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  status: number;
  errors?: ValidationError[];
}

export interface ApiMeta {
  timestamp: string;
  version?: string;
  requestId?: string;
}