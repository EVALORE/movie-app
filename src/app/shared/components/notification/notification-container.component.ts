import { Component, inject } from '@angular/core';
import { NotificationStore } from '../../../core/modal/notification-store.service';

@Component({
  selector: 'app-notification-container',
  imports: [],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css',
})
export class NotificationContainer {
  public readonly notificationStore = inject(NotificationStore);

  public removeNotification(id: number): void {
    this.notificationStore.remove(id);
  }
}
