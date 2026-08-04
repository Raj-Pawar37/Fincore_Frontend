export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginData {
  accessToken: string;
  accessTokenExpiry: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData | null;
  error: string | null;
}

