import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './santoshservice';
import { NotificationService } from '../shared/services/notification';
import { Authservice } from '../core/auth/authservice';
import { LoginRequest } from './santoshinterface';
import { nextTick } from 'process';

@Component({
  selector: 'app-santosh',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './santosh.html',
  styleUrl: './santosh.css',
})
export class Santosh {
  // Flags
  isLoading = signal(false);

  // services
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(Authservice);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void {}

  // Events

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.notificationService.warning(
        'Please enter a valid username and password.',
      );
      return;
    }

    var data: LoginRequest = {
      username: this.loginForm.controls.username.getRawValue() ?? '',
      password: this.loginForm.controls.password.getRawValue() ?? '',
    };
    this.isLoading.set(true);
    this.login(data);
  }

  // Database fucntions

  login(data: LoginRequest) {
    this.loginService.login(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.notificationService.success(res.message);
        console.log(res);
        //console.log(res.dat);
        console.log(data.username);

        //try if 2FA Enable
        const is2FAEnabled = (res.data as { is2FAEnabled?: boolean })
          ?.is2FAEnabled;
        console.log(is2FAEnabled);

        if (is2FAEnabled == false) {
          console.log('Need to 2FA setUP');
          this.router.navigate(['/setup2fa', data.username]);
        }
        if (is2FAEnabled) {
          this.router.navigate(['/verifyotp', data.username]);
        }

        if (res.data?.accessToken) {
          this.notificationService.success(
            res.message || 'Login completed successfully.',
          );
          this.authService.setAccessToken(res.data.accessToken);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        const message =
          err?.error?.message ||
          err?.error?.error ||
          'Invalid username or password.';
        this.notificationService.error(message, 'Login Failed');
        console.log(err);
      },
    });
  }
}
