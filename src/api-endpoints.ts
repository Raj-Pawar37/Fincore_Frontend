import { environment } from "./environments/environment.development";

const BASE_URL = environment.apiBaseUrl;

export const ApiEndpoints = {

    Auth: {
        DevLogin: `${BASE_URL}/auth/devLogin`,
        Login: `${BASE_URL}/auth/login`,
        VerifyOtp: `${BASE_URL}/auth/verifyTwoFactor`,
        RefreshToken: `${BASE_URL}/auth/refreshToken`,
        Logout: `${BASE_URL}/auth/logout`,
        ForgotPassword: `${BASE_URL}/auth/forgot-password`,
        ResetPassword: `${BASE_URL}/auth/reset-password`
    },

    Department: {
        ReadAll: `${BASE_URL}/department`,
        ReadById: `${BASE_URL}/department`,
        Create: `${BASE_URL}/department`,
        Update: `${BASE_URL}/department`,
        Delete: `${BASE_URL}/department`
    },

    Quoatation: {
        ReadAll: `${BASE_URL}/quotation`,
        ReadById: `${BASE_URL}/quotation`,
        Create: `${BASE_URL}/quotation`,
        Update: `${BASE_URL}/quotation`,
        Delete: `${BASE_URL}/quotation`
    },

    PurchaseRequisition: {
        ReadAll: `${BASE_URL}/purchaseRequisitions`,
        ReadById: `${BASE_URL}/purchaseRequisitions`,
        Update: `${BASE_URL}/purchaseRequisitions`,
        Dropdown: `${BASE_URL}/purchaseRequisitions/dropdown` // Custom endpoint we added for the dropdown
    },

    RFQ: {
        ReadAll: `${BASE_URL}/rfqs`,
        ReadById: `${BASE_URL}/rfqs`,
        Create: `${BASE_URL}/rfqs`,
        Update: `${BASE_URL}/rfqs`,
        Delete: `${BASE_URL}/rfqs`
    },

    RFQItem: {
        // Note: ReadAll expects the rfqId in the URL (e.g., /rfqItems/rfq/1)
        ReadAllByRfq: `${BASE_URL}/rfqItems/rfq`, 
        Create: `${BASE_URL}/rfqItems`,
        Update: `${BASE_URL}/rfqItems`,
        Delete: `${BASE_URL}/rfqItems`
    },

    RFQVendor: {
        // Note: ReadAll expects the rfqId in the URL (e.g., /rfqVendors/rfq/1)
        ReadAllByRfq: `${BASE_URL}/rfqVendors/rfq`,
        Create: `${BASE_URL}/rfqVendors`,
        Update: `${BASE_URL}/rfqVendors`,
        Delete: `${BASE_URL}/rfqVendors`
    }
};
