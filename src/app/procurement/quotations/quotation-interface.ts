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


export interface QuotationPaginationRequest {
  vendorId: number;
  pageNumber: number;
  pageSize: number;
  search: string;
  status: string;
}




// Need to move this in RFQ 

export interface VendorRfqDropdown {
  rfqId: number;
  vendorId: number;
  rfqVendorId: number;
  rfqNumber: string;
  rfqTitle: string | null;
}