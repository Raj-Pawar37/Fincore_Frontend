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

  Quotation: {
    Create: `${BASE_URL}/quotation`,
    Update: `${BASE_URL}/quotation`,
    Delete: `${BASE_URL}/quotation`,
    ReadById: `${BASE_URL}/quotation`,
    ReadAll: `${BASE_URL}/quotation`,
    ReadByRfqId: `${BASE_URL}/quotation`
  },

  QuotationItem: {
    Create: `${BASE_URL}/quoatationItem`,
    Update: `${BASE_URL}/quoatationItem`,
    Delete: `${BASE_URL}/quoatationItem`,
    ReadById: `${BASE_URL}/quoatationItem`,
    ReadAll: `${BASE_URL}/quoatationItem`,
    ReadByRfqId: `${BASE_URL}/quoatationItem`
  },

  RFQ: {
    Create: `${BASE_URL}/rfqs`,
    Update: `${BASE_URL}/rfqs`,
    Delete: `${BASE_URL}/rfqs`,
    ReadById: `${BASE_URL}/rfqs`,
    ReadAll: `${BASE_URL}/rfqs`,
    dropdown: `${BASE_URL}/rfqs/dropdown`
  },



};
