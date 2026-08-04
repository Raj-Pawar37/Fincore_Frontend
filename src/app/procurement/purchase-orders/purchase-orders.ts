import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { PurchaseOrderCreateRequestDTO, PurchaseOrderItem, PurchaseOrderUpdateRequestDTO } from './purchase-order-interface';
import { PurchaseOrderService } from './purchase-order-service';
import { NotificationService } from '../../shared/services/notification';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { PageHeader } from "../../shared/components/page-header/page-header";
import { DebounceDropdown } from "../../shared/components/debounce-dropdown/debounce-dropdown";
import { ConfirmModal } from "../../shared/components/confirm-modal/confirm-modal";

@Component({
  selector: 'app-purchase-orders',
  imports: [ReactiveFormsModule, CommonModule, PageHeader, DebounceDropdown, ConfirmModal],
  templateUrl: './purchase-orders.html',
  styleUrl: './purchase-orders.css',
})
export class PurchaseOrders implements OnInit {



  // Flags
  isLoading = signal(false);
  isEditMode = signal(false);
  isSubmitting = signal(false);



  // Services 
  poService = inject(PurchaseOrderService)
  notification = inject(NotificationService)
  

  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;

  // data 

  poList = signal<PurchaseOrderItem[]>([])




  // formGroup  

  poForm = new FormGroup({
    purchaseOrderId: new FormControl(0),
    vendorId: new FormControl(0),
    quotationId: new FormControl(0),
    poNumber: new FormControl(""),
  })







  ngOnInit(): void {
    this.readAll()
  }




  onSubmit() {
    if (this.poForm.invalid) {
      this.notification.warning("Please Fill All fields");
      return
    }

    let data: PurchaseOrderUpdateRequestDTO = {
      purchaseOrderId: this.poForm.controls.purchaseOrderId.value ?? 0,
      vendorId: this.poForm.controls.vendorId.value ?? 0,
      quotationId: this.poForm.controls.quotationId.value ?? 0,
      poNumber: this.poForm.controls.poNumber.value ?? "",
    }

    if (data.purchaseOrderId == 0) {
      this.Update(data);
    }
    else {
      this.Create(data);
    }
    this.resetForm();
    Modal.getOrCreateInstance('#purchaseOrderModal').hide();
  }

  openCreateForm() {
    this.isEditMode.set(false);
    this.resetForm();

    Modal.getOrCreateInstance('#purchaseOrderModal').show();
  }


  OpenEditForm(data: PurchaseOrderItem) {
    this.isEditMode.set(true);
    this.poForm.patchValue({
      purchaseOrderId: data.purchaseOrderId ?? 0,
      vendorId: data.vendorId ?? 0,
      quotationId: data.quotationId ?? 0,
      poNumber: data.poNumber ?? "",
    })

    Modal.getOrCreateInstance('#purchaseOrderModal').show();

  }

  OpenDeleteForm(data: PurchaseOrderItem) {
    this.confirmModal.open('Quotation Item', data.poNumber ?? '',
      () => this.Delete(data.purchaseOrderId)
    );
  }


  resetForm() {

    this.poForm.reset({
      purchaseOrderId: 0,
      vendorId: 0,
      quotationId: 0,
      poNumber: ""
    })

  }











  // Database Functions 

  Create(data: PurchaseOrderCreateRequestDTO) {
    this.poService.Create(data).subscribe({
      next: res => {

        if (!res.success) {
          this.notification.error(res.message || "Unable to create ")
        }

        this.notification.success(res.message || "Created Sucessfully ")
        this.readAll()

      },
      error: err => {
        this.notification.error(err.message || "Something Went Wrong ")
      }
    })
  }

  Update(data: PurchaseOrderUpdateRequestDTO) {
    this.poService.Update(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notification.error(res.message || "Unable to Update ")
        }

        this.notification.success(res.message || "updated Sucessfully ")
        this.readAll()
      },
      error: err => {
        this.notification.error(err.message || "Something Went Wrong ")

      }
    })
  }

  Delete(id: number) {
    this.poService.Delete(id).subscribe({
      next: res => {
        if (!res.success) {
          this.notification.error(res.message || "Unable to Delete ")
        }

        this.notification.success(res.message || "Deleted Sucessfully ")
        this.readAll()

      },
      error: err => {
        this.notification.error(err.message || "Something Went Wrong ")

      }
    })
  }

  readAll() {
    this.isLoading.set(true)
    this.poService.ReadAll().subscribe({
      next: res => {

        if (!res.success) {
          this.notification.error(res.message || "Unable to Fetch")
        }

        this.poList.set(res.data ?? []);
        this.isLoading.set(false)
      },
      error: err => {
        this.notification.error(err.message || "Something Went Wrong ")
        this.isLoading.set(false)
      }
    })
  }













}
