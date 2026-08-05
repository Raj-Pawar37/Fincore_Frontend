import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PermissionServices } from './permission-services';
import { CommonModule } from '@angular/common';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { error } from 'console';
import { format } from 'path';
import { nextTick } from 'process';
declare var $: any;

@Component({
  selector: 'app-permissions',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './permissions.html',
  styleUrl: './permissions.css',
})
export class Permissions implements OnInit {
  dataSource: any;
  constructor(
    private permissionServices: PermissionServices,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getPermission();
  }

  permissionForm = new FormGroup({
    permissionId: new FormControl(0),
    PermissionName: new FormGroup("",[Validators.required,Validators.pattern("[a-zA-Z]+$")]),
    moduleName: new FormControl(''),
    description: new FormControl(''),
    isActive: new FormControl(true),
  });

  get PermissionName() {
  return this.permissionForm.controls['PermissionName'];
  }

  getPermission() {
    this.permissionServices.getPermissionServices().subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
        alert('next per');
        console.log(this.dataSource);
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert('error run');
      },
    });
  }


}
