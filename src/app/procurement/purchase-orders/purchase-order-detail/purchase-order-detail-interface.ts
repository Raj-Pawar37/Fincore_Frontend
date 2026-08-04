export interface PurchaseOrdeDetailCreateRequestDTO {
    purchaseOrderId : number
    quotationItemId: number,
    itemName: string,
    unitPrice: number,
    tax: number,
    discount: number,
    qty: number,
    status: string
}

export interface PurchaseOrdeDetailUpdateRequestDTO extends PurchaseOrdeDetailCreateRequestDTO {
    poItemId: number,
    isActive: number,
}

export interface PurchaseOrderDetailItem {
    poItemId: number,
    purchaseOrderId: number,
    quotationItemId: number,
    itemName: string,
    unitPrice: number,
    tax: number,
    discount: number,
    qty: number,
    isActive: number,
    status: string
}