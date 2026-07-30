import { Component, inject } from '@angular/core';
import { Authservice } from '../../core/auth/authservice';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

    private readonly authService = inject(Authservice);


  testRefreshToken(): void {
    this.authService.refreshToken().subscribe({
      next: response => {
        console.log('Refresh succeeded:', response);

        const token = response.data?.accessToken;

        if (token) {
          this.authService.setAccessToken(token);
        }
      },
      error: error => {
        console.error('Refresh failed:', error);
      },
    });
  }

}
