import { Component, inject } from '@angular/core';
import { QuotationService } from './quotation.service';

@Component({
  selector: 'app-quotation',
  imports: [],
  templateUrl: './quotation.html',
  styleUrl: './quotation.css',
})
export class Quotation {

  private readonly quotationService = inject(QuotationService)


  ngOnInit(){
    this.ReadAll()
  }




  // Database Functions 

  ReadAll (){
    this.quotationService.readAll().subscribe({
      next: res => {
        console.log(res)
      },
      error: err => {

      }
    })
  }


}
