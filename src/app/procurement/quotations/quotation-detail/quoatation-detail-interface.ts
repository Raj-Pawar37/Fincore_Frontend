export interface QuotationDetailCreateRequestDTO {
    quotationId: number,
    rfqItemId: number,
    quantity: number,
    unitPrice: number,
    tax: number,
    discount: number,
    status: string
}

export interface QuotationDetailUpdateRequestDTO extends QuotationDetailCreateRequestDTO {
    quotationItemId: number,
    isActive: number,
}


export interface QuotationDetailReadByQuoatationRequestDTO {
    quotationId : number
}








// Response 

export interface QuotationDetailItem {
    quotationItemId: number,
    quotationId: number,
    rfqItemId: number,
    itemName: string,
    quantity: number,
    unitPrice: number,
    tax: number,
    discount: number,
    subTotal: number,
    totalAmount: number,
    status: string
}


// from other modules 

export interface RfqItemDropdownRequest {
  rfqId: number;
  searchText: string;
}

export interface RfqItem {
  rfqItemId: number;
  rfqId: number;
  name: string;
  quantity: number;
  description : string;
}