import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PermissionServices {
  constructor(private http: HttpClient) {}

  getPermissionServices() {
    return this.http.get(ApiEndpoints.Permission.ReadAll);
  }

  createPermissionServices(data: any) {
    return this.http.post(ApiEndpoints.Permission.Create, data);
  }

  updatePermissionServices(data: any) {
    return this.http.put(
      `${ApiEndpoints.Permission.Update}/${data.PermissionId}`,
      data,
    );
  }
  deletePermissionServices(id: any) {
    return this.http.delete(`${ApiEndpoints.Permission.Delete}/${id}`);
  }
}
