import { Component, inject } from '@angular/core';
import { NotificationStore } from '../../../core/modal/notification-store';

@Component({
  selector: 'app-notification-container',
  imports: [],
  templateUrl: './notification-container.html',
  styleUrl: './notification-container.css',
})
export class NotificationContainer {
  public readonly notificationStore = inject(NotificationStore);

  public removeNotification(id: number): void {
    this.notificationStore.remove(id);
  }
}
