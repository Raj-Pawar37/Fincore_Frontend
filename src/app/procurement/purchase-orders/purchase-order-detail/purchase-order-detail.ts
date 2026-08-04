import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification';
import { PurchaseOrdeDetailCreateRequestDTO, PurchaseOrdeDetailUpdateRequestDTO, PurchaseOrderDetailItem } from './purchase-order-detail-interface';
import { PurchaseOrderDetailService } from './purchase-order-detail-service';
import { error } from 'console';
import { sign } from 'crypto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModal } from "../../../shared/components/confirm-modal/confirm-modal";
import { PageHeader } from "../../../shared/components/page-header/page-header";
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-purchase-order-detail',
  imports: [ReactiveFormsModule, CommonModule, ConfirmModal, PageHeader],
  templateUrl: './purchase-order-detail.html',
  styleUrl: './purchase-order-detail.css',
})
export class PurchaseOrderDetail implements OnInit {


  // flags 
  isLoading = signal(false);
  isSubmitting = signal(false);
  isEditMode = signal(false);




  // services 
  poDetailService = inject(PurchaseOrderDetailService)
  notificationService = inject(NotificationService)

  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;

  // data 
  poDetail = signal<PurchaseOrderDetailItem[]>([])


  poDetailForm = new FormGroup({
    poItemId: new FormControl(0),
    purchaseOrderId: new FormControl(0),
    quotationItemId: new FormControl(0),
    itemName: new FormControl(""),
    unitPrice: new FormControl(0),
    tax: new FormControl(0),
    discount: new FormControl(0),
    qty: new FormControl(0),
    isActive: new FormControl(1),
    status: new FormControl("Not Recieved")
  })



  ngOnInit(): void {
    this.ReadAll()
  }


  // event handlers
  onSubmit() {
    this.isSubmitting.set(false);
    if (this.poDetailForm.invalid) {
      this.poDetailForm.markAllAsTouched();
      this.isSubmitting.set(false);
      return;
    }

    let data: PurchaseOrdeDetailUpdateRequestDTO = {
      poItemId: this.poDetailForm.controls.poItemId.value ?? 0,
      quotationItemId: this.poDetailForm.controls.quotationItemId.value ?? 0,
      isActive: this.poDetailForm.controls.isActive.value ?? 0,
      itemName: this.poDetailForm.controls.itemName.value ?? "",
      unitPrice: this.poDetailForm.controls.unitPrice.value ?? 0,
      tax: this.poDetailForm.controls.tax.value ?? 0,
      discount: this.poDetailForm.controls.discount.value ?? 0,
      qty: this.poDetailForm.controls.qty.value ?? 0,
      purchaseOrderId: this.poDetailForm.controls.purchaseOrderId.value ?? 0,
      status: this.poDetailForm.controls.status.value ?? "Not Recieved"
    }

    if (data.poItemId) {
      this.Create(data);
    }
    else {
      this.Update(data);
    }

    this.resetForm();
    Modal.getOrCreateInstance('#purchaseOrderDetailModal').hide();
  }

  OpenCreateForm() {
    this.isEditMode.set(true);
    this.resetForm()

    Modal.getOrCreateInstance('#purchaseOrderDetailModal').show();
  }

  OpenEditForm(data: PurchaseOrderDetailItem) {
    this.isEditMode.set(true);
    this.poDetailForm.patchValue({
      poItemId: data.poItemId ?? 0,
      quotationItemId: data.quotationItemId ?? 0,
      isActive: data.isActive ?? 1,
      itemName: data.itemName ?? "",
      unitPrice: data.unitPrice ?? 0,
      tax: data.tax ?? 0,
      discount: data.discount ?? 0,
      qty: data.qty ?? 0,
      purchaseOrderId: data.purchaseOrderId ?? 0,
      status: data.status ?? "Not Recieved"
    })

    Modal.getOrCreateInstance('#purchaseOrderDetailModal').show();

  }


  OpenDeleteForm(data: PurchaseOrderDetailItem) {
    this.confirmModal.open('Quotation Item', data.itemName ?? '',
      () => this.Delete(data.poItemId)
    );
  }


  resetForm() {
    this.poDetailForm.patchValue({
      poItemId: 0,
      quotationItemId: 0,
      isActive: 1,
      itemName: "",
      unitPrice: 0,
      tax: 0,
      discount: 0,
      qty: 0,
      purchaseOrderId: 0,
      status: "Not Recieved"
    })
  }


  // database Functions 

  Create(data: PurchaseOrdeDetailCreateRequestDTO) {

    this.poDetailService.Create(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message || "Unable to create");
          return;
        }

        this.notificationService.success(res.message || "Data Created");
        this.ReadAll()

      },
      error: err => {
        this.notificationService.error(err.message || "Something Went Wrong");
      }
    })

  }

  Update(data: PurchaseOrdeDetailUpdateRequestDTO) {

    this.poDetailService.Create(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message || "Unable to Update");
          return;
        }

        this.notificationService.success(res.message || "Data Update");
        this.ReadAll()

      },
      error: err => {
        this.notificationService.error(err.message || "Something Went Wrong");
      }
    })

  }

  Delete(id: number) {

    this.poDetailService.Delete(id).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message || "Unable to Delete");
          return;
        }

        this.notificationService.success(res.message || "Data Delete");
        this.ReadAll()

      },
      error: err => {
        this.notificationService.error(err.message || "Something Went Wrong");
      }
    })

  }

  ReadAll() {
    this.isLoading.set(true);
    this.poDetailService.ReadAll().subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message || "Unable to ReadAll");
          this.isLoading.set(false);
          return;
        }

        this.poDetail.set(res.data ?? [])
        this.isLoading.set(false);

      },
      error: err => {
        this.notificationService.error(err.message || "Something Went Wrong");
        this.isLoading.set(false);
      }
    })

  }


}
