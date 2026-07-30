import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageKeys } from '../storage-keys';
import { ApiEndpoints } from '../../../api-endpoints';

import { ApiResponse, LoginRequest, LoginResponse, TokenData } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  login(reqData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(ApiEndpoints.Auth.DevLogin, reqData, { withCredentials: true});
  }

  logoutApi(): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(ApiEndpoints.Auth.Logout,{}, { withCredentials: true});
  }

  refreshToken(): Observable<ApiResponse<TokenData>> {
    return this.http.post<ApiResponse<TokenData>>(ApiEndpoints.Auth.RefreshToken, {}, { withCredentials: true});
  }

  setAccessToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(StorageKeys.AccessToken, token);
    }
  }

  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(StorageKeys.AccessToken);
  }

  clearAccessToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(StorageKeys.AccessToken);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logoutLocal(): void {
    this.clearAccessToken();
  }
}