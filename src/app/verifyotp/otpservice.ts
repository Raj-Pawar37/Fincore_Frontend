import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class Otpservice {
  constructor(private http: HttpClient) {}

  verifyotp(data: any) {
    return this.http.post(ApiEndpoints.Auth.VerifyOtp, data);
  }
}
