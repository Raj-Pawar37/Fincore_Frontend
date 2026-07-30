import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { QuotationService } from './quotation-service';
import { NotificationService } from '../../shared/services/notification';
import { Quotation, QuotationCreateRequest, QuotationUpdateRequest, VendorRfqDropdown } from './quotation-interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateUtils } from '../../shared/utils/date-utils';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotations',
  imports: [ReactiveFormsModule, PageHeader, ConfirmModal, CommonModule],
  templateUrl: './quotations.html',
  styleUrl: './quotations.css',
})
export class Quotations implements OnInit {

  vendorId = 1; // temporarily; later take from auth/JWT

  // Flags
  isLoading = signal(false);
  isSubmitting = signal(false);
  isEditMode = signal(false);


  // Services
  private readonly quotationService = inject(QuotationService);
  private readonly notificationService = inject(NotificationService);
  dateUtils = DateUtils;


  // Object references
  @ViewChild('quotationModal') quotationModalElement!: ElementRef<HTMLElement>;
  @ViewChild(ConfirmModal) confirmModal!: ConfirmModal;
  private quotationModalInstance?: Modal;

  selectedQuotationId = 0;
  quotationList: Quotation[] = [];
  rfqDropdownList: VendorRfqDropdown[] = [];

  quotationForm = new FormGroup({

    quotationId: new FormControl(0),
    isActive: new FormControl(1),
    rfqId: new FormControl(0, [Validators.required]),
    rfqVendorId: new FormControl(0, [Validators.required]),
    quotationNumber: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    quotationDate: new FormControl('', Validators.required),
    status: new FormControl('Draft', Validators.required),
    desc: new FormControl('')

  });


  ngOnInit() {
    this.readAll();
    this.readRfqDropdown();
  }


  // Event handlers

  openCreateModal(): void {
    this.resetForm();

    this.quotationForm.patchValue({
      quotationDate: DateUtils.today(),
      isActive: 1
    });

    this.quotationModalInstance ??= new Modal(this.quotationModalElement.nativeElement, { backdrop: 'static', keyboard: false });
    this.quotationModalInstance.show();
  }

  editQuotation(data: Quotation) {
    this.isEditMode.set(true);

    const currentRfq: VendorRfqDropdown = {
      rfqId: data.rfqId,
      rfqVendorId: data.rfqVendorId,
      rfqNumber: data.rfqNumber ?? '',
      rfqTitle: '',
      vendorId: this.vendorId
    };

    this.rfqDropdownList = [ currentRfq, ...this.rfqDropdownList];


    this.quotationForm.patchValue({
      quotationId: data.quotationId,
      rfqId: data.rfqId,
      rfqVendorId: data.rfqVendorId,
      quotationNumber: data.quotationNumber,
      quotationDate: DateUtils.toInputDate(data.quotationDate),
      status: data.status,
      desc: data.desc
    });

    this.quotationModalInstance ??= new Modal(this.quotationModalElement.nativeElement, { backdrop: 'static', keyboard: false });
    this.quotationModalInstance.show();

  }

  closeQuotationModal(): void {
    this.quotationModalInstance?.hide();
  }

  openDeleteModal(data: Quotation): void {
    this.selectedQuotationId = data.quotationId;
    this.confirmModal.open('Quotation', data.quotationNumber);
  }

  confirmDelete(): void {
    if (this.selectedQuotationId <= 0) {
      return;
    }

    this.delete(this.selectedQuotationId);
  }



  onSubmit() {
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      this.notificationService.warning('Please fill all required quotation fields.');
      return;
    }


    var data: QuotationUpdateRequest = {
      quotationId: this.quotationForm.controls.quotationId.value ?? 0,
      isActive: this.quotationForm.controls.isActive.value ?? 0,
      rfqId: this.quotationForm.controls.rfqId.value ?? 0,
      rfqVendorId: this.quotationForm.controls.rfqVendorId.value ?? 0,
      quotationNumber: this.quotationForm.controls.quotationNumber.value ?? "",
      quotationDate: this.quotationForm.controls.quotationDate.value ?? "",
      status: this.quotationForm.controls.status.value ?? "",
      desc: this.quotationForm.controls.desc.value ?? "",
    }
    this.isSubmitting.set(true);

    if (data.quotationId == 0) {
      this.createQutation(data);
    }
    else {
      this.updateQutation(data);
    }


  }


  onRfqChange(event: Event): void {
    const rfqVendorId = Number(
      (event.target as HTMLSelectElement).value
    );

    const selectedRfq = this.rfqDropdownList.find(
      x => x.rfqVendorId === rfqVendorId
    );

    if (!selectedRfq) {
      this.quotationForm.patchValue({
        rfqId: 0,
        rfqVendorId: 0
      });

      return;
    }

    this.quotationForm.patchValue({
      rfqId: selectedRfq.rfqId,
      rfqVendorId: selectedRfq.rfqVendorId
    });
  }






  // Helper Fucntions 

  resetForm() {
    this.quotationForm.reset({
      quotationId: 0,
      rfqId: null,
      rfqVendorId: null,
      quotationNumber: '',
      quotationDate: '',
      status: 'Draft',
      desc: ''
    });

    this.isEditMode.set(false);
  }





  // Database/API functions

  createQutation(data: QuotationCreateRequest) {
    this.quotationService.create(data).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (!res.success) {
          this.notificationService.error(res.message || ' Unable to create quotation.');
          return;
        }

        this.notificationService.success(res.message || ' Quotation created successfully.');
        this.closeQuotationModal();
        this.resetForm();
        this.readAll();
        this.readRfqDropdown();
        // Close modal later
      },

      error: (err) => {
        this.isSubmitting.set(false);
        const message = err?.error?.message || err?.error?.error || 'Unable to create quotation.';
        this.notificationService.error(message);
      }
    });
  }


  updateQutation(data: QuotationUpdateRequest) {
    this.quotationService.update(data).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (!res.success) {
          this.notificationService.error(res.message || ' Unable to update quotation.');
          return;
        }

        this.notificationService.success(res.message || ' Quotation updated successfully.');
        this.closeQuotationModal();
        this.resetForm();
        this.readAll();
        this.readRfqDropdown();
        // Close modal later
      },

      error: (err) => {
        this.isSubmitting.set(false);
        const message = err?.error?.message || err?.error?.error || 'Unable to update quotation.';
        this.notificationService.error(message);
      }
    });
  }


  readAll() {
    this.isLoading.set(true);

    this.quotationService.readAll().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.quotationList = res.data ?? [];
        
      },

      error: (err) => {
        this.isLoading.set(false);
        this.quotationList = [];

        const message = err?.error?.message || err?.error?.error || 'Unable to fetch quotations.';
        this.notificationService.error(message);

      }
    });
  }


  delete(quotationId: number) {
    this.quotationService.delete(quotationId).subscribe({
      next: (res) => {
        if (!res.success) {
          this.notificationService.error(res.message || 'Unable to delete quotation.');
          return;
        }

        this.notificationService.success(res.message || 'Quotation deleted successfully.');
        this.readAll();
        this.readRfqDropdown();
      },

      error: (err) => {
        const message = err?.error?.message || err?.error?.error || 'Unable to delete quotation.';
        this.notificationService.error(message);
      }
    });
  }


  readRfqDropdown() {


    this.quotationService.getDropdown('', this.vendorId, 'Open').subscribe({
      next: (res) => {
        this.rfqDropdownList = res.data ?? [];
      },
      error: (err) => {
        this.rfqDropdownList = [];
        const message = err?.error?.message || err?.error?.error || 'Unable to fetch RFQs.';
        this.notificationService.error(message);
      }
    });
  }















}
