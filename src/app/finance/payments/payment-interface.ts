export interface PaymentCreateRequestDTO {
    paymentId: number,
    masterId: number,
    isActive: number,
    masterType: string,
    amount: number,
    paymentDate: Date | null,
    transactionType: string,
    paymentMode: string,
    remarks: string
}


export interface PaymentUpdateRequestDTO extends PaymentCreateRequestDTO {

}


export interface PaymentItemDTO {
    paymentId: number,
    masterId: number,
    masterType: string,
    amount: number,
    paymentDate: string,
    transactionType: string,
    paymentMode: string,
    remarks: string,
    isActive: number,
}