import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationsService } from './notifications-service';
import { NotificationCard } from './notification-card/notification-card';

@Component({
  selector: 'app-notifications',
  imports: [NotificationCard],
  template: `
    @for (notification of notificationStore.notifications(); track notification.id) {
      <app-notification-card [notification]="notification" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fixed top-5 right-5 z-50 flex flex-col gap-2.5',
  },
})
export class Notifications {
  public readonly notificationStore = inject(NotificationsService);
}
