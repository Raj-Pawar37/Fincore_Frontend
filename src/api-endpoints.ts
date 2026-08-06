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
    ReadByRfqId: `${BASE_URL}/quotation`,
    getQuotationComparsion: `${BASE_URL}/quotation/getQuotationComparsion`
  },

  QuotationItem: {
    Create: `${BASE_URL}/quotationItem`,
    Update: `${BASE_URL}/quotationItem`,
    Delete: `${BASE_URL}/quotationItem`,
    ReadById: `${BASE_URL}/quotationItem`,
    ReadAll: `${BASE_URL}/quotationItem`,
    ReadByQuotationId: `${BASE_URL}/quotationItem/quotation`
  },

  RFQ: {
    Create: `${BASE_URL}/rfqs`,
    Update: `${BASE_URL}/rfqs`,
    Delete: `${BASE_URL}/rfqs`,
    ReadById: `${BASE_URL}/rfqs`,
    ReadAll: `${BASE_URL}/rfqs`,
    dropdown: `${BASE_URL}/rfqs/dropdown`
  },

  PurchaseOrder: {
    Create: `${BASE_URL}/purchaseOrder`,
    Update: `${BASE_URL}/purchaseOrder`,
    Delete: `${BASE_URL}/purchaseOrder`,
    ReadById: `${BASE_URL}/purchaseOrder`,
    ReadAll: `${BASE_URL}/purchaseOrder/GetAllPurchaseOrders`,
    Status: `${BASE_URL}/purchaseOrder/Status`,
    dropdown: `${BASE_URL}/purchaseOrder/dropdown`
  },

  PurchaseOrderDetail: {
    Create: `${BASE_URL}/purchaseOrderItem`,
    Update: `${BASE_URL}/purchaseOrderItem`,
    Delete: `${BASE_URL}/purchaseOrderItem`,
    ReadById: `${BASE_URL}/purchaseOrderItem`,
    ReadByPurchaseOrderId: `${BASE_URL}/purchaseOrderItem`,
    ReadAll: `${BASE_URL}/purchaseOrderItem/GetAll`,
    dropdown: `${BASE_URL}/purchaseOrderItem/dropdown`
  },

  APInvoice: {
    Create: `${BASE_URL}/APInvoice`,
    Update: `${BASE_URL}/APInvoice`,
    Delete: `${BASE_URL}/APInvoice`,
    ReadById: `${BASE_URL}/APInvoice`,
    ReadAll: `${BASE_URL}/APInvoice`,
  },

  Payment: {
    Create: `${BASE_URL}/payment`,
    Update: `${BASE_URL}/payment`,
    Delete: `${BASE_URL}/payment`,
    ReadById: `${BASE_URL}/payment`,
    ReadAll: `${BASE_URL}/payment`,
  },

  RFQItem: {
    ReadByRFQId: `${BASE_URL}/rfqItems/ReadByRFQId`,
  },



};
