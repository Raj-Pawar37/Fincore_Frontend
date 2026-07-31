import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleServices } from './role-services';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-roles',
  imports: [CommonModule, ReactiveFormsModule,MatTableModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles implements OnInit  {
  dataSource: any;
   constructor(private roleServices:RoleServices,private cdr:ChangeDetectorRef){ }

   ngOnInit(): void {
       this.getRole();
   }


getRole(){
  this.roleServices.getRoleServices().subscribe({
    next:(res:any) =>{
    
        this.dataSource = res.data;
        this.cdr.detectChanges();
      console.log(res.data);
    },
    error:err=>{
      console.log(err);
    }
  })
}

}
