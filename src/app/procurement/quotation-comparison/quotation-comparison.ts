import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuotationService } from '../quotations/quotation-service';
import { QuotationComparisonApiItem, QuotationComparisonResponse, VendorRfqDropdown } from '../quotations/quotation-interface';
import { NotificationService } from '../../shared/services/notification';

interface QuotationVendor {
  quotationId: number;
  vendorId: number;
  vendorName: string;
  quotationNumber: string;
  status: string;
}

interface QuotationItemOption {
  quotationItemId: number;
  quotationId: number;
  rfqItemId: number;

  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
  totalAmount: number;
}

interface ComparisonItem {
  rfqItemId: number;
  itemName: string;
  requiredQuantity: number;
  quotationItems: QuotationItemOption[];
}

@Component({
  selector: 'app-quotation-comparison',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './quotation-comparison.html',
  styleUrl: './quotation-comparison.css',
})
export class QuotationComparison {

  // Flags
  isLoading= signal(false);

  // services 
  quotationService = inject(QuotationService)
  notificationService = inject(NotificationService)
  comparisonData = signal<QuotationComparisonResponse | null>(null);


  // Data 
  vendors = signal<QuotationVendor[]>([])
  comparisonItems = signal<ComparisonItem[]>([])
  rfqList = signal<VendorRfqDropdown[]>([])
  hiddenQuotationIds: number[] = [];



  // Filters
  selectedRFQId: number = 11;
  selectedQuotationItems: { [rfqItemId: number]: number } = {};


  // Lifecycle
  ngOnInit(): void {
    this.readComparison();
    this.getAllRFQ();
  }

  // Event Handlers
  onRFQChange(): void {
    this.selectedQuotationItems = [];
    this.readComparison();
  }

  selectQuotationItem(rfqItemId: number, quotationItemId: number): void {
    this.selectedQuotationItems[rfqItemId] = quotationItemId;
  }

  selectEntireQuotation(quotationId: number): void {

    // Select this vendor wherever he has quoted
    for (const item of this.comparisonItems()) {

      const quotationItem =
        item.quotationItems.find(
          x => x.quotationId === quotationId
        );

      if (quotationItem) {

        this.selectedQuotationItems[item.rfqItemId] =
          quotationItem.quotationItemId;

      }
    }
  }







  // Hide Fucnationality 

  hideQuotation(quotationId: number): void {

    if (!this.hiddenQuotationIds.includes(quotationId)) {
      this.hiddenQuotationIds.push(quotationId);
    }

    // Remove selected items belonging to hidden vendor
    for (const item of this.comparisonItems()) {

      const quotationItem =
        item.quotationItems.find(
          x => x.quotationId === quotationId
        );

      if (
        quotationItem &&
        this.selectedQuotationItems[item.rfqItemId] === quotationItem.quotationItemId
      ) {
        delete this.selectedQuotationItems[item.rfqItemId];
      }

    }

  }


  restoreQuotation(quotationId: number): void {
    this.hiddenQuotationIds = this.hiddenQuotationIds.filter(x => x !== quotationId);
  }

  isQuotationHidden(quotationId: number): boolean {
    return this.hiddenQuotationIds.includes(quotationId);

  }










  submitSelection(): void {

    const selectedItems = Object.entries(this.selectedQuotationItems).map(
      ([rfqItemId, quotationItemId]) => ({
        rfqItemId: Number(rfqItemId),
        quotationItemId: quotationItemId
      })
    );

    const request = {
      rfqId: this.selectedRFQId,
      selectedItems: selectedItems
    };

    console.log('Final Request:', request);
  }


  isItemSelected(rfqItemId: number): boolean {

    return !!this.selectedQuotationItems[rfqItemId];
  }

  isQuotationItemSelected(rfqItemId: number, quotationItemId: number): boolean {
    return (this.selectedQuotationItems[rfqItemId] === quotationItemId);
  }

  getQuotationItem(item: ComparisonItem, quotationId: number): QuotationItemOption | undefined {
    return item.quotationItems.find(
      x => x.quotationId === quotationId
    );
  }

  unselectQuotationItem(rfqItemId: number): void {
    delete this.selectedQuotationItems[rfqItemId];
  }


  // Database Functions 
  readComparison(): void {

    this.isLoading.set(true);

    this.quotationService.readComparison(this.selectedRFQId).subscribe({
      next: (response) => {

        if (!response.success || !response.data) {
          return;
        }

        this.comparisonData.set(response.data);
        this.transformComparisonData();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }

    });
  }

  getAllRFQ() {


    this.quotationService.getDropdown("", 0, "Open").subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message || "Something went Wrong");
        }

        this.rfqList.set(res.data ?? []);
      },
      error: err => {

      }
    })
  }






  private transformComparisonData(): void {

    const vendorMap = new Map<number, QuotationVendor>();

    for (const item of this.comparisonData()?.items ?? []) {

      if (!vendorMap.has(item.quotationId)) {

        vendorMap.set(item.quotationId, {
          quotationId: item.quotationId,
          vendorId: item.vendorId,
          vendorName: item.vendorName,
          quotationNumber: item.quotationNumber,
          status: item.quotationStatus
        });

      }

    }

    this.vendors.set(Array.from(vendorMap.values()));


    // Comparison Items
    const comparisonMap = new Map<number, ComparisonItem>();

    for (const item of this.comparisonData()?.items ?? []) {

      if (!comparisonMap.has(item.rfqItemId)) {

        comparisonMap.set(item.rfqItemId, {

          rfqItemId: item.rfqItemId,

          itemName: item.itemName,

          requiredQuantity: item.requiredQuantity,

          quotationItems: []

        });

      }

      comparisonMap.get(item.rfqItemId)?.quotationItems.push({

        quotationItemId: item.quotationItemId,

        quotationId: item.quotationId,

        rfqItemId: item.rfqItemId,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        tax: item.tax,

        discount: item.discount,

        totalAmount: item.totalAmount

      });

    }

    this.comparisonItems.set(Array.from(comparisonMap.values()));

  }

}