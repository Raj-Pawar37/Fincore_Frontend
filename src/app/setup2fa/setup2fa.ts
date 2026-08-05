import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authservice } from '../core/auth/authservice';
import { NotificationService } from '../shared/services/notification';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Setup2faservice } from './setup2faservice';

@Component({
  selector: 'app-setup2fa',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setup2fa.html',
  styleUrl: './setup2fa.css',
})
export class Setup2fa implements OnInit {
  userName: string | null = null;
  qrCodeBase64: string | null = null;

  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly authService = inject(Authservice);
  private readonly route = inject(ActivatedRoute);
  private readonly setup2FA = inject(Setup2faservice);

  constructor(private cdr: ChangeDetectorRef) {}

  setupForm = new FormGroup({
    userName: new FormControl(''),
  });

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName');
    console.log('Param userName:', this.userName);

    if (this.userName) {
      this.setupForm.patchValue({
        userName: this.userName,
      });
    }
  }

  onSubmit() {
    this.setup2FA.setup2FA(this.setupForm.value).subscribe({
      next: (res: any) => {
        console.log('Response received:', res);
        this.qrCodeBase64 = res.data.qrCodeBase64;
      },
      error: (error) => {
        console.error('Error setting up 2FA:', error);
        alert('Error generating QR code');
      },
    });
  }
}
