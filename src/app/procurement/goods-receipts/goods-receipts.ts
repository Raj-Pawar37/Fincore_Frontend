import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { sign } from 'crypto';
import { single } from 'rxjs';
import { NotificationService } from '../../shared/services/notification';
import { GrnReceiptService } from './grn-receipt-service';
import { GrnCreateRequestDTO, grnItemDTO, GrnUpdateRequestDTO } from './grn-receipt-interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ConfirmModal } from "../../shared/components/confirm-modal/confirm-modal";
import { PageHeader } from "../../shared/components/page-header/page-header";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-goods-receipts',
  imports: [ConfirmModal, PageHeader, RouterLink, ReactiveFormsModule],
  templateUrl: './goods-receipts.html',
  styleUrl: './goods-receipts.css',
})
export class GoodsReceipts implements OnInit {


  // flags 
  isLoading = signal(false);
  isSubmitting = signal(false);
  isEditMode = signal(false);


  // services 
  notificationService = inject(NotificationService);
  grnService = inject(GrnReceiptService)
  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;


  // data 
  grnList = signal<grnItemDTO[]>([])


  grnForm = new FormGroup({
    grnId: new FormControl(0),
    purchaseOrderId: new FormControl(0),
    grnNumber: new FormControl(""),
    receivedBy: new FormControl(0),
    receivedDate: new FormControl(""),
    remarks: new FormControl(""),
    deliveryChallanNumber: new FormControl(""),
    isActive: new FormControl(1)
  })


  ngOnInit(): void {
    this.ReadAll()
  }
  // event handles 

  openCreateForm() {
    this.isEditMode.set(true);
    this.resetForm();
    Modal.getOrCreateInstance('#grnModal').show();
  }

  OpenEditForm(data: grnItemDTO) {
    this.isEditMode.set(false);
    this.grnForm.patchValue({
      grnId: data.grnId,
      purchaseOrderId: data.purchaseOrderId,
      grnNumber: data.grnNumber,
      receivedBy: data.receivedBy,
      receivedDate: data.receivedDate,
      remarks: data.remarks,
      deliveryChallanNumber: data.deliveryChallanNumber,
      isActive: 1,
    })

    Modal.getOrCreateInstance('#grnModal').show();
  }

  OpenDeleteForm(data: grnItemDTO) {
    this.confirmModal.open('Quotation Item', data.poNumber ?? '',
      () => this.Delete(data.purchaseOrderId)
    );
  }

  onSubmit() {
    this.isSubmitting.set(true)
    if (this.grnForm.invalid) {
      this.grnForm.markAllAsTouched();
      this.notificationService.warning("Please fill all the Details");
      this.isSubmitting.set(false);
      return;
    }

    let data: GrnUpdateRequestDTO = {
      grnId: this.grnForm.controls.grnId.value ?? 0,
      isActive: this.grnForm.controls.isActive.value ?? 0,
      purchaseOrderId: this.grnForm.controls.purchaseOrderId.value ?? 0,
      grnNumber: this.grnForm.controls.grnNumber.value ?? "",
      receivedBy: this.grnForm.controls.receivedBy.value ?? 0,
      receivedDate: this.grnForm.controls.receivedDate.value ?? "",
      remarks: this.grnForm.controls.remarks.value ?? "",
      deliveryChallanNumber: this.grnForm.controls.deliveryChallanNumber.value ?? ""
    }


    if (data.grnId == 0) {
      this.Create(data);
    }
    else {
      this.Update(data);
    }

    Modal.getOrCreateInstance('#grnModal').hide();


  }

  resetForm() {
    this.grnForm.reset({
      grnId: 0,
      purchaseOrderId: 0,
      grnNumber: "",
      receivedBy: 0,
      receivedDate: "",
      remarks: "",
      deliveryChallanNumber: "",
      isActive: 1,
    })
  }







  // datanase Functions
  Create(data: GrnCreateRequestDTO) {
    this.grnService.Create(data).subscribe({
      next: res => {
        if (res.success) {
          this.notificationService.error(res.message || "Data has not been created")
        }

        this.notificationService.success(res.message || "Data has been created")
        this.ReadAll()

      },
      error: err => {
        this.notificationService.error(err.message || "Something went wrong")
      }
    })
  }

  Update(data: GrnUpdateRequestDTO) {
    this.grnService.Update(data).subscribe({
      next: res => {
        if (res.success) {
          this.notificationService.error(res.message || "Data has not been UpdaTE")
        }

        this.notificationService.success(res.message || "Data has been updated")
        this.ReadAll()
      },
      error: err => {
        this.notificationService.error(err.message || "Something went wrong")
      }
    })
  }

  Delete(id: number) {
    this.grnService.Delete(id).subscribe({
      next: res => {
        if (res.success) {
          this.notificationService.error(res.message || "Data has not been Delte")
        }
        this.notificationService.success(res.message || "Data has been Deleted")
        this.ReadAll()
      },
      error: err => {
        this.notificationService.error(err.message || "Something went wrong")
      }
    })
  }

  ReadAll() {
    this.grnService.ReadAll().subscribe({
      next: res => {
        if (res.success) {
          this.notificationService.error(res.message || "Data has not been fetchAll")
        }

        this.grnList.set(res.data ?? [])
      },
      error: err => {
        this.notificationService.error(err.message || "Something went wrong")
      }
    })
  }




}
