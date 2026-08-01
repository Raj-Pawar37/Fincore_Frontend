import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class RoleServices {
  constructor(private http: HttpClient) {}

  getRoleServices() {
    return this.http.get(ApiEndpoints.Roles.ReadAll);
  }

  updateRoleServices(data: any) {
    return this.http.put(`${ApiEndpoints.Roles.Update}/${data.RoleId}`, data);
  }

  insertServices(data: any) {
    return this.http.post(ApiEndpoints.Roles.Create, data);
  }

  EditServices(data: any) {
    return this.http.put(`${ApiEndpoints.Roles.Update}/${data.RoleId}`, data);
  }

  DeleteService(id: number) {
    return this.http.delete(`${ApiEndpoints.Roles.Update}/${id}`);
  }
}
