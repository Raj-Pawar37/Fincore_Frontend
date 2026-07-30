export type NotificationType = | 'success' | 'error' | 'warning' | 'info';

export interface NotificationMessage {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  duration: number;
}