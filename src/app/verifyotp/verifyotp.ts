import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Otpservice } from './otpservice';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../shared/services/notification';
import { Authservice } from '../core/auth/authservice';
@Component({
  selector: 'app-verifyotp',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verifyotp.html',
  styleUrl: './verifyotp.css',
})
export class Verifyotp {
  userName: any;
  otp: any;
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly authService = inject(Authservice);

  optForm = new FormGroup({
    otp: new FormControl(''),
    userName: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private otpservice: Otpservice,
  ) {}
  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName');
    console.log('Im from otp service');
    console.log(this.userName);
    this.optForm.patchValue({
      userName: this.userName,
    });
  }

  onSubmit(data: any) {
    console.log('on submit work');
    console.log(data);

    this.otpservice.verifyotp(data).subscribe({
      next: (res: any) => {
        alert('Wow ');
        console.log('otp verify');

        if (res.data?.accessToken) {
          this.notificationService.success(
            res.message || 'Login completed successfully.',
          );
          this.authService.setAccessToken(res.data.accessToken);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        alert('opps ');
        console.log('shit error comes');
        console.log(this.otp);
        console.log(this.userName);
        console.log(error);
      },
    });
  }
}
