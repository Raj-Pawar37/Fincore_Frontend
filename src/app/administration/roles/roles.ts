import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RoleServices } from './role-services';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles implements OnInit {
  roleData: any[] = [];

  roleForm = new FormGroup({
    roleId: new FormControl(''),
    roleName: new FormControl(''),
    roleCode: new FormControl(''),
    roleDescription: new FormControl(''),
    isActive: new FormControl(false)
  });

  constructor(
    private roleServices: RoleServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRoleTs();
  }

  getRoleTs() {
    this.roleServices.getRoleServices().subscribe({
      next: (res: any) => {
        this.roleData = res.data;
        console.log('Fetched roles successfully:', this.roleData);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching role data:', err);
      }
    });
  }

  editRole(data: any) {
    console.log('Editing role data:', data);
    
    // Patch values into the form when Edit is clicked
    this.roleForm.patchValue({
      roleId: data.roleId || data.RoleId,
      roleName: data.roleName || data.RoleName,
      roleCode: data.roleCode || data.RoleCode,
      roleDescription: data.roleDescription || data.RoleDescription,
      isActive: data.isActive !== undefined ? data.isActive : data.IsActive
    });
  }

 updateRole() {
    if (this.roleForm.valid) {
      // Map camelCase form values to PascalCase to match your C# backend model
      const formValue = this.roleForm.value;
      const payload = {
        RoleId: formValue.roleId,
        RoleName: formValue.roleName,
        RoleCode: formValue.roleCode,
        RoleDescription: formValue.roleDescription,
        IsActive: formValue.isActive
      };

      console.log('Sending update payload:', payload);

      this.roleServices.updateRoleServices(payload).subscribe({
        next: (res: any) => {
          console.log('Updated successfully', res);
          this.getRoleTs(); // Refresh the table data
        },
        error: (err) => {
          console.error('Error updating role:', err);
        }
      });
    }
  }
}