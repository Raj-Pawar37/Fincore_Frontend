import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-debounce-dropdown',
  imports: [ReactiveFormsModule],
  templateUrl: './debounce-dropdown.html',
  styleUrl: './debounce-dropdown.css'
})
export class DebounceDropdown {

  // Inputs
  placeholder = input<string>('Search...');
  displayKey = input<string>('name');
  items = input<any[]>([]);
  selectedText = input<string>('');


  // Outputs
  searchChanged = output<string>();
  itemSelected = output<any>();


  // Services
  private readonly destroyRef = inject(DestroyRef);


  // Flags
  showDropdown = signal(false);


  // Controls
  searchControl = new FormControl('');


  constructor() {

    // Patch selected value during edit
    effect(() => {
      this.searchControl.setValue( this.selectedText(), { emitEvent: false });
    });


    // Debounce search
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {

        const searchText = value?.trim() ?? '';
        this.showDropdown.set(true);
        this.searchChanged.emit(searchText);
      });
  }


  selectItem(item: any): void {

    this.searchControl.setValue(item[this.displayKey()], { emitEvent: false });
    this.itemSelected.emit(item);
    this.showDropdown.set(false);
  }


  onFocus(): void {
    if (this.items().length > 0) {
      this.showDropdown.set(true);
    }
  }


  clear(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.showDropdown.set(false);
  }
}