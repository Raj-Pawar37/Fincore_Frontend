import { Injectable, signal } from '@angular/core';
import { NotificationMessage, NotificationType,} from '../interface/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsSignal = signal<NotificationMessage[]>([]);

  readonly notifications = this.notificationsSignal.asReadonly();
  private notificationId = 0;

  success(message: string, title = 'Success', duration = 4000): void {
    this.show('success', title, message, duration);
  }

  error(message: string, title = 'Error', duration = 5000): void {
    this.show('error', title, message, duration);
  }

  warning(message: string,title = 'Warning', duration = 4500): void {
    this.show('warning', title, message, duration);
  }

  info(message: string, title = 'Information', duration = 4000): void {
    this.show('info', title, message, duration);
  }

  remove(id: number): void {
    this.notificationsSignal.update(notifications =>
        notifications.filter(
          notification => notification.id !== id
        )
    );
  }

  clear(): void {
    this.notificationsSignal.set([]);
  }

  private show(type: NotificationType, title: string, message: string, duration: number): void {
    const id = ++this.notificationId;
    const notification: NotificationMessage = {id, type, title, message, duration,};

    this.notificationsSignal.update(
      notifications => [
        ...notifications,
        notification,
      ]
    );

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }
}