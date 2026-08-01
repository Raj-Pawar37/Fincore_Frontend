import { environment } from './environments/environment.development';

const BASE_URL = environment.apiBaseUrl;

export const ApiEndpoints = {
  Auth: {
    DevLogin: `${BASE_URL}/auth/devLogin`,
    Login: `${BASE_URL}/auth/login`,
    VerifyOtp: `${BASE_URL}/auth/verifyTwoFactor`,
    RefreshToken: `${BASE_URL}/auth/refreshToken`,
    Logout: `${BASE_URL}/auth/logout`,
    ForgotPassword: `${BASE_URL}/auth/forgot-password`,
    ResetPassword: `${BASE_URL}/auth/reset-password`,
  },

  Department: {
    ReadAll: `${BASE_URL}/department`,
    ReadById: `${BASE_URL}/department`,
    Create: `${BASE_URL}/department`,
    Update: `${BASE_URL}/department`,
    Delete: `${BASE_URL}/department`,
  },

  Quoatation: {
    ReadAll: `${BASE_URL}/quotation`,
    ReadById: `${BASE_URL}/quotation`,
    Create: `${BASE_URL}/quotation`,
    Update: `${BASE_URL}/quotation`,
    Delete: `${BASE_URL}/quotation`,
  },
  Roles: {
    ReadAll: `${BASE_URL}/roles`,
    ReadById: `${BASE_URL}/roles`,
    Create: `${BASE_URL}/roles`,
    Update: `${BASE_URL}/roles`,
    Delete: `${BASE_URL}/roles`,
  },

  Permission: {
    ReadAll: `${BASE_URL}/permissions`,
    ReadById: `${BASE_URL}/permissions`,
    Create: `${BASE_URL}/permissions`,
    Update: `${BASE_URL}/permissions`,
    Delete: `${BASE_URL}/permissions`,
  },
};
