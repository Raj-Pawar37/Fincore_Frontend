export interface APICreateRequestDTO {
    apInvoiceId: number,
    vendorId: number,
    masterId: number,
    masterType: string,
    invoiceAmount: number,
    invoiceNumber: string,
    invoiceDate: Date,
    status: string,
    isActive: number
}

export interface APIUpadteRequestDTO extends APICreateRequestDTO {

}

export interface APIItem {
    apInvoiceId: number,
    vendorId: number,
    vendorName: string,
    masterId: number,
    masterType: string,
    invoiceNumber: string,
    invoiceAmount: number,
    invoiceDate: string,
    status: string
    isActive: number
}