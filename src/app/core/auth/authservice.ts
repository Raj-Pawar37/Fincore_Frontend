import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageKeys } from '../storage-keys';
import { Observable } from 'rxjs';
import { ApiResponse, TokenData } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../../api-endpoints';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);


  setAccessToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(StorageKeys.AccessToken, token);
    }
  }

  // Get Access Token
  getAccessToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(StorageKeys.AccessToken);
  }

  // Remove Access Token
  clearAccessToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(StorageKeys.AccessToken);
    }
  }

  // Check Login
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  // Logout
  logout(): void {
    this.clearAccessToken();
  }

  refreshToken(): Observable<ApiResponse<TokenData>> {
    return this.http.post<ApiResponse<TokenData>>(ApiEndpoints.Auth.RefreshToken, {}, { withCredentials: true});
  }


}
