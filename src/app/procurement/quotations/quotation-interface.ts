export interface QuotationCreateRequest {
  rfqId: number;
  rfqVendorId: number;
  quotationNumber: string;
  quotationDate: string;
  status: string;
  desc: string;
}

export interface QuotationUpdateRequest extends QuotationCreateRequest{
  quotationId: number;
  isActive: number;
}

export interface Quotation {
  quotationId: number;
  rfqId: number;
  rfqVendorId: number;
  quotationNumber: string;
  amount: number;
  quotationDate: string;
  status: string;
  desc: string;
  vendorName: string;
  rfqNumber: string | null;
}