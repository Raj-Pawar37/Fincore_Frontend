import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PurchaseRequisitionService } from './purchase-requisition.service';

@Component({
  selector: 'app-purchase-requisitions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-requisitions.html',
  styleUrl: './purchase-requisitions.css',
})
export class PurchaseRequisitions implements OnInit {
  prs: any[] = [];
  
  pageNumber: number = 1;
  pageSize: number = 10;
  searchText: string = '';
  totalPages: number = 0;
  totalRecords: number = 0;

  updateForm = new FormGroup({
    prId: new FormControl<number | null>(null),
    prNumber: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('')
  });

  constructor(
    private prService: PurchaseRequisitionService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadPRs();
  }

  loadPRs() {
    this.prService.getAll(this.pageNumber, this.pageSize, this.searchText).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.prs = res.data;
          this.totalPages = res.metadata.totalPages;
          this.totalRecords = res.totalNumberRecord;
          
          // Force Angular to explicitly detect changes and update the HTML
          this.cdr.detectChanges(); 
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        console.error('Error fetching PRs', err);
      }
    });
  }

  onSearch(term: string) {
    this.searchText = term;
    this.pageNumber = 1; 
    this.loadPRs();
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.loadPRs();
    }
  }

  openEditModal(pr: any) {
    this.updateForm.patchValue({
      prId: pr.prId,
      prNumber: pr.prNumber,
      title: pr.title,
      description: pr.description,
      status: pr.status
    });
  }

  submitUpdate() {
    const id = this.updateForm.value.prId;
    
    const updateData = {
      prNumber: this.updateForm.value.prNumber || '',
      title: this.updateForm.value.title || '',
      description: this.updateForm.value.description || '',
      status: this.updateForm.value.status || ''
    };

    if (id) {
      this.prService.update(id, updateData).subscribe({
        next: (res: any) => {
          if (res.success) {
            console.log('PR updated successfully', res);
            alert('Purchase Requisition updated successfully!');
            
            this.loadPRs(); 
          } else {
            alert('Failed to update: ' + res.message);
          }
        },
        error: (err: any) => {
          console.error('Error updating PR', err);
        }
      });
    }
  }
}