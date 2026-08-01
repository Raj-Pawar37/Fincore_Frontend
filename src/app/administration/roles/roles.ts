import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleServices } from './role-services';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { error } from 'console';
declare var $: any;

@Component({
  selector: 'app-roles',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles implements OnInit {
  dataSource: any;
  constructor(
    private roleServices: RoleServices,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getRole();
  }

  RoleForm = new FormGroup({
    RoleId: new FormControl(0),
    RoleName: new FormControl(''),
    RoleDescription: new FormControl(''),
    RoleCode: new FormControl(''),
    IsActive: new FormControl(true),
  });

  getRole() {
    this.roleServices.getRoleServices().subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
        this.cdr.detectChanges();
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  AddRole(data: any) {
    this.roleServices.insertServices(data).subscribe({
      next: (res: any) => {
        alert('Insert Done');
        this.getRole();
        console.log(data);
        this.RoleForm.reset({ RoleId: 0, IsActive: true });
        $('#exampleModal').modal('hide');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  Editbtn(data: any) {
    alert(data);
    console.log(data);

    this.RoleForm.patchValue({
      RoleName: data.roleName,
      RoleCode: data.roleCode,
      RoleDescription: data.roleDescription,
      IsActive: data.isActive,
      RoleId: data.roleId,
    });
  }

  update(data: any) {
    alert('upadte called');
    console.log(data);
    this.roleServices.EditServices(data).subscribe({
      next: (res) => {
        this.RoleForm.reset({ RoleId: 0, IsActive: true });
        alert('update sucess');
        $('#exampleModal2').modal('hide');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  Deletebtn(id: number) {
    alert(id);
    this.roleServices.DeleteService(id).subscribe({
      next: (res) => {
        alert('Delete done');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
