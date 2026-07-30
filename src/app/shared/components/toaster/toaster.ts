import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification';
import { NotificationType } from '../../interface/notification.interface';


@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.html',
  styleUrl: './toaster.css',
})
export class Toaster {
  readonly notificationService = inject(NotificationService);

  removeNotification(id: number): void {
    this.notificationService.remove(id);
  }

  getIcon(type: NotificationType): string {
    switch (type) {
      case 'success':
        return 'bi-check-circle-fill';

      case 'error':
        return 'bi-x-circle-fill';

      case 'warning':
        return 'bi-exclamation-triangle-fill';

      case 'info':
        return 'bi-info-circle-fill';

      default:
        return 'bi-bell-fill';
    }
  }
}