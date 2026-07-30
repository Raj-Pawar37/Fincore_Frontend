export interface QuotationDto {
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


export interface QuotationsResponse {
  success: boolean;
  message: string;
  data: QuotationDto[];
  error: string | null;
  metadata: any;
  totalNumberRecord: number;
}


export interface QuotationCreateUpdate {
  rfqId: number;
  rfqVendorId: number;
  quotationNumber: string;
  amount: number;
  quotationDate: string;
  status: string;
  desc: string;
  vendorName: string;
  rfqNumber?: string | null;
}
