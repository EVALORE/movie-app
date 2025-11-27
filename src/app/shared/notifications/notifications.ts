import { Component, inject } from '@angular/core';
import { NotificationsService } from './notifications-service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  public readonly notificationStore = inject(NotificationsService);

  public removeNotification(id: number): void {
    this.notificationStore.remove(id);
  }
}
