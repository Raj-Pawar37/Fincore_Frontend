export interface PurchaseOrderCreateRequestDTO {
    purchaseOrderId: number,
    vendorId: number,
    quotationId: number,
    poNumber: string
}

export interface PurchaseOrderUpdateRequestDTO extends PurchaseOrderCreateRequestDTO {

}

export interface PurchaseOrderUpdateStatusRequestDTO {
    status : string,
    id : number
}


export interface PurchaseOrderItem {
    purchaseOrderId: number,
    vendorId: number,
    quotationId: number,
    poNumber: string,
    totalAmount: number,
    status: string,
    vendorName: string,
    quotationNumber: string
}


