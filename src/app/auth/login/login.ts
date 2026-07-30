import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Authservice } from '../../core/auth/authservice';
import { Router } from '@angular/router'
import { NotificationService } from '../../shared/services/notification';
import { LoginRequest } from '../../core/auth/auth.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  // Flags
  isLoading = signal(false);

  // services
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
      this.notificationService.warning('Please enter a valid username and password.');
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
    this.authService.login(data).subscribe({
      next: (res) => {
        this.isLoading.set(false);

        if (res.data?.accessToken) {
          this.notificationService.success(res.message || 'Login completed successfully.');
          this.authService.setAccessToken(res.data.accessToken);
          this.router.navigate(['/dashboard']);
        }

      },
      error: (err) => {
        this.isLoading.set(false);
        const message = err?.error?.message || err?.error?.error || 'Invalid username or password.';
        this.notificationService.error(message,'Login Failed');
        console.log(err);
      },
    });
  }
}
