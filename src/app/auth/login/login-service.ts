import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './login-interface';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  

  login(reqData: LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(ApiEndpoints.Auth.DevLogin, reqData, { withCredentials : true});
  }


}
