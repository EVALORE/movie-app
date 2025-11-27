import { computed, Injectable, signal } from '@angular/core';
import { Notification } from './notification-card';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public readonly notificationsMap = signal<Map<symbol, Notification>>(new Map());
  public readonly notifications = computed(() => Array.from(this.notificationsMap().values()));

  public show(notification: Omit<Notification, 'id' | 'remove'>): void {
    this.notificationsMap.update((notifications) => {
      const id = Symbol('notificationId');
      const newMap = new Map(notifications);
      newMap.set(id, {
        ...notification,
        id,
        remove: this.remove.bind(this, id),
      });
      return newMap;
    });
  }

  public remove(id: symbol): void {
    this.notificationsMap.update((notifications) => {
      notifications.delete(id);
      return new Map(notifications);
    });
  }
}
