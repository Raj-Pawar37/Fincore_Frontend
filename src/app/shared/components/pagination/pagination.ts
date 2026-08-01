import { Component, computed, input, output, signal } from '@angular/core';
import { PaginationChange } from './pagination-interface';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination {

  // Inputs
  totalRecords = input<number>(0);


  // Properties
  pageNumber = signal(1);
  pageSize = signal(10);


  // Outputs
  pageChanged = output<PaginationChange>();


  // Computed properties
  totalPages = computed(() => {
    return Math.ceil(this.totalRecords() / this.pageSize());
  });

  startRecord = computed(() => {
    if (this.totalRecords() === 0) {
      return 0;
    }

    return ((this.pageNumber() - 1) * this.pageSize()) + 1;
  });


  endRecord = computed(() => {
    const end = this.pageNumber() * this.pageSize();
    return Math.min( end, this.totalRecords());

  });


  pageNumbers = computed(() => {
    return Array.from(
      { length: this.totalPages()},
      (_, index) => index + 1
    );
  });


  // Event handlers

  previousPage(): void {
    if (this.pageNumber() <= 1) {
      return;
    }

    this.pageNumber.update( value => value - 1);
    this.emitChange();
  }


  nextPage(): void {
    if ( this.pageNumber() >= this.totalPages()) {
      return;
    }

    this.pageNumber.update( value => value + 1);
    this.emitChange();
  }


  goToPage(page: number): void {
    if ( page < 1 || page > this.totalPages() || page === this.pageNumber()) {
      return;
    }

    this.pageNumber.set(page);
    this.emitChange();
  }


  onPageSizeChange(event: Event): void {
    const selectedPageSize = Number(
      (event.target as HTMLSelectElement).value
    );

    this.pageSize.set(selectedPageSize);

    // Whenever page size changes,
    // return to the first page.
    this.pageNumber.set(1);

    this.emitChange();
  }


  // Helper functions

  private emitChange(): void {
    this.pageChanged.emit({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    });
  }
}