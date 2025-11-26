import { Injectable, signal } from '@angular/core';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationStore {
  public readonly notifications = signal<Notification[]>([]);

  public show(message: string, type: NotificationType = 'info', duration = 3000): void {
    const id = Date.now() + Math.random();
    const newNotification: Notification = { id, message, type, duration };

    this.notifications.update((notifications) => [...notifications, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  public remove(id: number): void {
    this.notifications.update((notifications) =>
      notifications.filter((notification) => notification.id !== id),
    );
  }
}
