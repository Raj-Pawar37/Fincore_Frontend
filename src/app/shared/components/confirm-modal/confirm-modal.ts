import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {

   // Object references

  @ViewChild('deleteModal')
  deleteModalElement!: ElementRef<HTMLElement>;
  private modalInstance?: Modal;


  // Properties
  title = '';
  name = '';


  // Output events

  @Output()
  confirmed = new EventEmitter<void>();


  // Public functions

  open(title: string, name: string): void {
    this.title = title;
    this.name = name;

    this.modalInstance ??= new Modal(this.deleteModalElement.nativeElement, { backdrop: 'static', keyboard: false});
    this.modalInstance.show();
  }


  close(): void {
    this.modalInstance?.hide();
  }


  confirmDelete(): void {
    this.confirmed.emit();
    this.close();
  }


}
