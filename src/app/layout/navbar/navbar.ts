import { Component, inject } from '@angular/core';
import { Authservice } from '../../core/auth/authservice';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // services
  private readonly authService = inject(Authservice);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  logout(): void {
    this.authService.logoutApi().subscribe({
      next: () => {
        this.authService.clearAccessToken();
        this.notificationService.success('Logged out successfully.');
        this.router.navigate(['/login']);


      },
      error: () => {
        this.authService.clearAccessToken();
        this.router.navigate(['/login']);
      },
    });
  }
}
