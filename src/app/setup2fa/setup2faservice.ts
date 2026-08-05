import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class Setup2faservice {
  constructor(private http: HttpClient) {}

  setup2FA(data: any) {
    return this.http.post(ApiEndpoints.Auth.setup2FA, data);
  }
}
