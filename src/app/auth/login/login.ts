import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginRequest } from './login-interface';
import { LoginService } from './login-service';
import { Authservice } from '../../core/auth/authservice';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  
  // Flags
  isLoading = false;

  // services
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(Authservice);
  private readonly router = inject(Router);

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
      return;
    }

    var data: LoginRequest = {
      username: this.loginForm.controls.username.getRawValue() ?? '',
      password: this.loginForm.controls.password.getRawValue() ?? '',
    };
    this.isLoading = true;
    this.login(data);
  }

  // Database fucntions

  login(data: LoginRequest) {
    this.loginService.login(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.data?.accessToken) {
          this.authService.setAccessToken(res.data.accessToken);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
