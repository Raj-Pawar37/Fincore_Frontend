import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification';
import { QuoatationDetailService } from './quotation-detail-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuotationDetailItem, QuotationDetailReadByQuoatationRequestDTO, QuotationDetailUpdateRequestDTO, RfqItem, RfqItemDropdownRequest } from './quoatation-detail-interface';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { ConfirmModal } from '../../../shared/components/confirm-modal/confirm-modal';
import { DebounceDropdown } from "../../../shared/components/debounce-dropdown/debounce-dropdown";

@Component({
  selector: 'app-quotation-detail',
  imports: [ReactiveFormsModule, ConfirmModal, DebounceDropdown],
  templateUrl: './quotation-detail.html',
  styleUrl: './quotation-detail.css',
})
export class QuoatationDetail implements OnInit {


  // Flags 
  isLoading = signal(true);
  isSubmitting = signal(false);
  isEditMode = signal(true);


  // Services 
  notificationServie = inject(NotificationService);
  quoDetailService = inject(QuoatationDetailService)
  route = inject(ActivatedRoute)
  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;


  // Formgroups 
  quotationDetailFG = new FormGroup({
    quotationItemId: new FormControl(0),
    isActive: new FormControl(1),
    quotationId: new FormControl(0),
    rfqItemId: new FormControl(0),
    quantity: new FormControl(0),
    unitPrice: new FormControl(0),
    tax: new FormControl(0),
    discount: new FormControl(0),
    status: new FormControl("Pending")
  })

  readAllDTO: QuotationDetailReadByQuoatationRequestDTO = {
    quotationId: 0
  }

  // Data
  quotationId: number = 0
  rfqId = 8;
  quoDetailList = signal<QuotationDetailItem[]>([]);
  rfqItemDropdownList = signal<RfqItem[]>([]);
  selectedRfqItemName = signal('');

  ngOnInit(): void {
    this.quotationId = Number(this.route.snapshot.paramMap.get('id'));
    this.readAllDTO.quotationId = this.quotationId
    this.ReadAll()
    this.onRfqItemSearch("");
  }

  // Event Handlers 
  openCreateModal() {
    this.isEditMode.set(false);
    this.resetForm();
    this.selectedRfqItemName.set('');

    Modal.getOrCreateInstance('#quotationItemModal').show();

  }

  openEditModal(item: QuotationDetailItem) {

    this.selectedRfqItemName.set(item.itemName);

    this.quotationDetailFG.patchValue({
      quotationItemId: item.quotationItemId ?? 0,
      quotationId: this.quotationId,
      rfqItemId: item.rfqItemId ?? 0,
      quantity: item.quantity ?? 0,
      unitPrice: item.unitPrice ?? 0,
      tax: item.tax ?? 0,
      discount: item.discount ?? 0,
      status: "Pending",
      isActive: 1,
    })
    this.isEditMode.set(true);
    Modal.getOrCreateInstance('#quotationItemModal').show();

  }

  openDeleteModal(item: QuotationDetailItem) {
    this.confirmModal.open('Quotation Item', item.itemName ?? '',
      () => this.delete(item.quotationItemId)
    );
  }

  onSubmit() {
    if (!this.quotationDetailFG.valid) {
      this.quotationDetailFG.markAllAsTouched();
      this.notificationServie.warning("Please fill the required Fileds")
    }
    this.isSubmitting.set(true);
    var data: QuotationDetailUpdateRequestDTO = {
      quotationItemId: this.quotationDetailFG.controls.quotationItemId.value ?? 0,
      isActive: this.quotationDetailFG.controls.isActive.value ?? 0,
      quotationId: this.quotationDetailFG.controls.quotationId.value ?? 0,
      rfqItemId: this.quotationDetailFG.controls.rfqItemId.value ?? 0,
      quantity: this.quotationDetailFG.controls.quantity.value ?? 0,
      unitPrice: this.quotationDetailFG.controls.unitPrice.value ?? 0,
      tax: this.quotationDetailFG.controls.tax.value ?? 0,
      discount: this.quotationDetailFG.controls.discount.value ?? 0,
      status: this.quotationDetailFG.controls.status.value ?? "Pending"
    }

    if (data.quotationItemId == 0) {
      this.create(data);
    }
    else {
      this.update(data);
    }

  }


  // Helper Fucntion 
  resetForm() {
    this.quotationDetailFG.patchValue({
      quotationItemId: 0,
      isActive: 1,
      quotationId: this.quotationId,
      rfqItemId: 0,
      quantity: 0,
      unitPrice: 0,
      tax: 0,
      discount: 0,
      status: "Pending"
    })
  }

  onRfqItemSearch(searchText: string): void {

    const request: RfqItemDropdownRequest = {
      rfqId: this.rfqId,
      searchText: searchText
    };

    this.quoDetailService.RfqItemDropdown(request).subscribe({
      next: res => {
        this.rfqItemDropdownList.set(res.data ?? []);
      },

      error: err => {
        this.rfqItemDropdownList.set([]);
        this.notificationServie.error(err?.error?.message || 'Unable to fetch RFQ items.');
      }
    });
  }

  onRfqItemSelected(item: RfqItem): void {

    this.quotationDetailFG.patchValue({
      rfqItemId: item.rfqItemId,
      quantity: item.quantity
    });

    this.selectedRfqItemName.set(item.name);

  }



  // Database Fucntion

  create(data: QuotationDetailUpdateRequestDTO) {
    this.quoDetailService.Create(data).subscribe({
      next: res => {

        if (!res.success) {
          this.notificationServie.warning(res.message || "unable to Add Quoatation Detail ")
          this.isSubmitting.set(false);
          return
        }

        this.notificationServie.success(res.message || "Quoatation Detail Has been Added")
        Modal.getOrCreateInstance('#quotationItemModal').hide();
        this.ReadAll()
        this.isSubmitting.set(false);
      },
      error: err => {
        this.notificationServie.success(err?.error?.message || "Something went wrong")
        this.isSubmitting.set(false);
      }
    })
  }

  update(data: QuotationDetailUpdateRequestDTO) {
    this.quoDetailService.Update(data).subscribe({
      next: res => {

        if (!res.success) {
          this.notificationServie.warning(res.message || "unable to Update Quoatation Detail ")
          this.isSubmitting.set(false);
          return
        }

        this.notificationServie.success(res.message || "Quoatation Detail Has been Update")
        Modal.getOrCreateInstance('#quotationItemModal').hide();
        this.ReadAll()
        this.isSubmitting.set(false);
      },
      error: err => {
        this.notificationServie.success(err?.error?.message || "Something went wrong")
        this.isSubmitting.set(false);
      }
    })
  }

  delete(data: number) {
    this.quoDetailService.Delete(data).subscribe({
      next: res => {

        if (!res.success) {
          this.notificationServie.warning(res.message || "unable to Delete Quoatation Detail ")
          return
        }

        this.notificationServie.success(res.message || "Quoatation Detail Has been Deleted")
        this.ReadAll()
      },
      error: err => {
        this.notificationServie.success(err?.error?.message || "Something went wrong")
      }
    })
  }

  ReadAll() {
    this.quoDetailService.ReadByQuoatationId(this.readAllDTO).subscribe({
      next: res => {

        if (!res.success) {
          this.notificationServie.warning(res.message || "unable to Fetch Quoatation Detail ")
          return
        }
        this.quoDetailList.set(res.data ?? []);

      },
      error: err => {
        this.notificationServie.success(err?.error?.message || "Something went wrong")
      }
    })
  }




}
