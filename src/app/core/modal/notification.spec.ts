import { TestBed } from '@angular/core/testing';

import { NotificationStore } from './notification-store';

describe('Notification', () => {
  let service: NotificationStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
