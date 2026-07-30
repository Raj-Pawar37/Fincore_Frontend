export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenData {
  accessToken: string;
  accessTokenExpiry?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error?: string | null;
}

export type LoginResponse = ApiResponse<TokenData>;