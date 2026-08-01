import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-debounce-search',
  imports: [ReactiveFormsModule],
  templateUrl: './debounce-search.html',
  styleUrl: './debounce-search.css',
})
export class DebounceSearch {

  // Inputs
  placeholder = input<string>('Search...');
  delay = input<number>(500);


  // Output
  searchChanged = output<string>();


  // Services
  private readonly destroyRef = inject(DestroyRef);

  // Form control
  searchControl = new FormControl('');


  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(this.delay()),
      distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.searchChanged.emit(value?.trim() ?? '');
    });
  }


  clearSearch(): void {
    this.searchControl.setValue('');
  }
}