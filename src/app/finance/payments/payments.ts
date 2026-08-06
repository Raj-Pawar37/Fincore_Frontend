import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { PaymentService } from './payment-service';
import { NotificationService } from '../../shared/services/notification';
import { single } from 'rxjs';
import { PaymentCreateRequestDTO, PaymentItemDTO, PaymentUpdateRequestDTO } from './payment-interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { PageHeader } from "../../shared/components/page-header/page-header";
import { ConfirmModal } from "../../shared/components/confirm-modal/confirm-modal";

@Component({
  selector: 'app-payments',
  imports: [PageHeader, ReactiveFormsModule, ConfirmModal],
  templateUrl: './payments.html',
  styleUrl: './payments.css',
})
export class Payments implements OnInit {



  // Flags
  isLoading = signal(false);
  isSubmitting = signal(false);
  isEditMode = signal(false);


  // Services
  paymentService = inject(PaymentService)
  notificataionService = inject(NotificationService)
  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;

  // Data 
  paymentList = signal<PaymentItemDTO[]>([]);

  paymentForm = new FormGroup({
    paymentId: new FormControl(0),
    masterId: new FormControl(0),
    isActive: new FormControl(1),
    masterType: new FormControl(""),
    amount: new FormControl(0),
    paymentDate: new FormControl(Date),
    transactionType: new FormControl(""),
    paymentMode: new FormControl(""),
    remarks: new FormControl("")
  })



  ngOnInit(): void {
    this.ReadAll();
  }


  // Event Handlers 
  openCreateForm() {
    this.isEditMode.set(false);
    this.ResetForm();
    Modal.getOrCreateInstance("#PaymentModal").show()
  }

  OpenEditForm(data: PaymentItemDTO) {
    this.isEditMode.set(true);
    this.paymentForm.patchValue({
      paymentId: data.paymentId ?? 0,
      masterId: data.masterId ?? 0,
      isActive: data.isActive ?? 0,
      masterType: data.masterType ?? 0,
      amount: data.amount ?? 0,
      paymentDate: null,
      transactionType: data.transactionType ?? 0,
      paymentMode: data.paymentMode ?? 0,
      remarks: data.remarks ?? 0.
    })
    Modal.getOrCreateInstance("#PaymentModal").show()
  }


  OpenDeleteForm(data: PaymentItemDTO) {
    this.confirmModal.open('Payment Item', data.paymentMode ?? '',
      () => this.Delete(data.paymentId)
    );
  }

  ResetForm() {
    this.paymentForm.reset({
      paymentId: 0,
      masterId: 0,
      isActive: 1,
      masterType: "",
      amount: 0,
      paymentDate: null,
      transactionType: "",
      paymentMode: "",
      remarks: ""
    })

  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      this.notificataionService.warning("Please Fill the All info");
      return;
    }

    let data: PaymentUpdateRequestDTO = {
      paymentId: this.paymentForm.controls.paymentId.value ?? 0,
      masterId: this.paymentForm.controls.masterId.value ?? 0,
      isActive: this.paymentForm.controls.isActive.value ?? 1,
      masterType: this.paymentForm.controls.masterType.value ?? "",
      amount: this.paymentForm.controls.amount.value ?? 0,
      paymentDate: null,
      transactionType: this.paymentForm.controls.transactionType.value ?? "",
      paymentMode: this.paymentForm.controls.paymentMode.value ?? "",
      remarks: this.paymentForm.controls.remarks.value ?? ""
    }

    if (data.paymentId == 0) {
      this.Create(data);
    }
    else {
      this.Update(data);
    }
    Modal.getOrCreateInstance("#PaymentModal").hide()
  }




  // Database Functions
  Create(data: PaymentCreateRequestDTO) {

    this.paymentService.Create(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificataionService.error(res.message ?? "Unable to create");
          return;
        }

        this.notificataionService.success(res.message ?? "Data has been created")
        this.ReadAll()

      },
      error: err => {
        this.notificataionService.error(err.message ?? "Soemthing Went Wrong");

      }
    })
  }

  Update(data: PaymentUpdateRequestDTO) {

    this.paymentService.Create(data).subscribe({
      next: res => {
        if (!res.success) {
          this.notificataionService.error(res.message ?? "Unable to Udpate");
          return;
        }

        this.notificataionService.success(res.message ?? "Data has been Updated")
        this.ReadAll()

      },
      error: err => {
        this.notificataionService.error(err.message ?? "Soemthing Went Wrong");

      }
    })
  }

  Delete(id : number) {

    this.paymentService.Delete(id).subscribe({
      next: res => {
        if (!res.success) {
          this.notificataionService.error(res.message ?? "Unable to Delte");
          return;
        }

        this.notificataionService.success(res.message ?? "Data has been Deleted")
        this.ReadAll()

      },
      error: err => {
        this.notificataionService.error(err.message ?? "Soemthing Went Wrong");

      }
    })
  }

  ReadAll() {

    this.paymentService.ReadAll().subscribe({
      next: res => {
        if (!res.success) {
          this.notificataionService.error(res.message ?? "Unable to Fetch");
          return;
        }

        this.paymentList.set(res.data ?? []);

      },
      error: err => {
        this.notificataionService.error(err.message ?? "Soemthing Went Wrong");

      }
    })
  }

}
