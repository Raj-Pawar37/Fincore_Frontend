import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from './santoshinterface';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  

  login(reqData: LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(ApiEndpoints.Auth.Login, reqData, { withCredentials : true});
  }

}
