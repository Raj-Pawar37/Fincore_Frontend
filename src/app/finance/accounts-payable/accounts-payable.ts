import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AccountsPayableService } from './accounts-payable-service';
import { NotificationService } from '../../shared/services/notification';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';
import { APICreateRequestDTO, APIItem, APIUpadteRequestDTO } from './accounts-payable-interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { PageHeader } from "../../shared/components/page-header/page-header";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-accounts-payable',
  imports: [ConfirmModal, PageHeader, RouterLink, ReactiveFormsModule],
  templateUrl: './accounts-payable.html',
  styleUrl: './accounts-payable.css',
})
export class AccountsPayable implements OnInit {


  // flags 
  isLoading = signal(false);
  isSubmitting = signal(false);
  isEditMode = signal(false);


  // Services 
  apiService = inject(AccountsPayableService);
  notificationService = inject(NotificationService);

  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;

  // Data 
  apiInvoiceList = signal<APIItem[]>([])

  apiForm = new FormGroup({
    apInvoiceId: new FormControl(0),
    vendorId: new FormControl(0),
    masterId: new FormControl(0),
    masterType: new FormControl(""),
    invoiceAmount: new FormControl(0),
    invoiceNumber: new FormControl(""),
    invoiceDate: new FormControl(Date),
    status: new FormControl(""),
    isActive: new FormControl(1)
  })


  ngOnInit(): void {
    this.ReadAll()
  }

  // Events 
  onSubmit() {
    this.isSubmitting.set(true);
    if (this.apiForm.invalid) {
      this.notificationService.warning("Please fill All the Required Fields");
      this.apiForm.markAllAsTouched()
      this.isSubmitting.set(false);
    }

    let data: APIUpadteRequestDTO = {
      apInvoiceId: this.apiForm.controls.apInvoiceId.value ?? 0,
      vendorId: this.apiForm.controls.vendorId.value ?? 0,
      masterId: this.apiForm.controls.masterId.value ?? 0,
      masterType: this.apiForm.controls.masterType.value ?? "",
      invoiceAmount: this.apiForm.controls.invoiceAmount.value ?? 0,
      invoiceNumber: this.apiForm.controls.invoiceNumber.value ?? "",
      invoiceDate: new Date(),
      status: this.apiForm.controls.status.value ?? "",
      isActive: this.apiForm.controls.isActive.value ?? 1
    }

    if (data.apInvoiceId == 0) {
      this.Create(data)
    }
    else {
      this.Update(data)
    }

    this.isSubmitting.set(false)
    Modal.getOrCreateInstance('#ApiInvoiceModal').hide()
  }

  openCreateForm() {
    this.isEditMode.set(false);
    this.ResetForm()

    Modal.getOrCreateInstance('#ApiInvoiceModal').show()
  }

  OpenEditForm(data: APIItem) {
    this.isEditMode.set(false)
    this.apiForm.reset({
      apInvoiceId: data.apInvoiceId ?? 0,
      vendorId: data.vendorId ?? 0,
      masterId: data.masterId ?? 0,
      masterType: data.masterType ?? "",
      invoiceAmount: data.invoiceAmount ?? 0,
      invoiceNumber: data.invoiceNumber ?? "",
      invoiceDate: null,
      status: data.status ?? "",
      isActive: data.isActive ?? 0
    })
    Modal.getOrCreateInstance('#ApiInvoiceModal').show()
  }

  OpenDeleteForm(data: APIItem) {
    this.confirmModal.open('Api Invoice Item', data.invoiceNumber ?? '',
      () => this.Delete(data.apInvoiceId)
    );
  }


  ResetForm() {
    this.apiForm.reset({
      apInvoiceId: 0,
      vendorId: 0,
      masterId: 0,
      masterType: "",
      invoiceAmount: 0,
      invoiceNumber: "",
      invoiceDate: null,
      status: "",
      isActive: 1
    })
  }




  // Database Fucntion 
  Create(data: APICreateRequestDTO) {

    this.apiService.Create(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message ?? 'Unable to Create')
          return;
        }

        this.notificationService.success(res.message ?? 'Data has been Created')
        this.ReadAll()

      },
      error: err => {
        this.notificationService.error(err.message ?? 'Something Went Wrong')

      }
    })
  }
  Update(data: APIUpadteRequestDTO) {

    this.apiService.Update(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message ?? 'Unable to update')
          return;
        }

        this.notificationService.success(res.message ?? 'Data has been Updated')
        this.ReadAll()
      },
      error: err => {
        this.notificationService.error(err.message ?? 'Something Went Wrong')

      }
    })
  }

  Delete(id: number) {

    this.apiService.Delete(id).subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message ?? 'Unable to Delete')
          return;
        }

        this.notificationService.success(res.message ?? 'Data has been Delted')
        this.ReadAll()
      },
      error: err => {
        this.notificationService.error(err.message ?? 'Something Went Wrong')

      }
    })
  }

  ReadAll() {

    this.apiService.ReadAll().subscribe({
      next: res => {
        if (!res.success) {
          this.notificationService.error(res.message ?? 'Unable to FetchF')
          return;
        }

        this.apiInvoiceList.set(res.data ?? [])

      },
      error: err => {
        this.notificationService.error(err.message ?? 'Something Went Wrong')

      }
    })
  }



}
