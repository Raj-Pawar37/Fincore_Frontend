import { Component, ElementRef, ViewChild } from '@angular/core';
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

  private deleteAction?: () => void;


  // Public functions

  open( title: string, name: string, deleteAction: () => void ): void {

    this.title = title;
    this.name = name;
    this.deleteAction = deleteAction;

    this.modalInstance ??= new Modal( this.deleteModalElement.nativeElement,
      {
        backdrop: 'static',
        keyboard: false
      }
    );

    this.modalInstance.show();
  }


  close(): void {
    this.modalInstance?.hide();
  }


  confirmDelete(): void {
    this.deleteAction?.();
    this.close();
  }
}