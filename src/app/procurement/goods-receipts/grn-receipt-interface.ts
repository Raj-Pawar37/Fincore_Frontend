
export interface GrnCreateRequestDTO {
    purchaseOrderId: number,
    grnNumber: string,
    receivedBy: number,
    receivedDate: string,
    remarks: string,
    deliveryChallanNumber: string
}

export interface GrnUpdateRequestDTO extends GrnCreateRequestDTO {
    grnId: number,
    isActive: number,
}

export interface grnItemDTO {
    grnId: number,
    purchaseOrderId: number,
    poNumber: string,
    grnNumber: string,
    receivedBy: number,
    username: string,
    receivedDate: string,
    remarks: string,
    deliveryChallanNumber: string,
    status: string,
}