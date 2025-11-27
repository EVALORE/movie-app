import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  InjectionToken,
  input,
  OnInit,
} from '@angular/core';
import { fromEvent, repeat, takeUntil, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const DEFAULT_NOTIFICATION_DURATION = new InjectionToken<number>(
  'DEFAULT_NOTIFICATION_DURATION',
  {
    providedIn: 'root',
    factory: (): number => 3000,
  },
);

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: symbol;
  message: string;
  type: NotificationType;
  duration?: number;
  remove: () => void;
}

@Component({
  selector: 'app-notification-card',
  imports: [],
  template: `<span>{{ notification().message }}</span>`,
  styles: `
    :host(.error) {
      background-color: var(--color-red-300);
    }
    :host(.info) {
      background-color: var(--color-blue-300);
    }
    :host(.success) {
      background-color: var(--color-green-300);
    }
  `,
  host: {
    '[class]': 'notification().type',
    class:
      'flex bg-slate-700 text-white px-3 py-5 rounded-s cursor-pointer min-w-3xs shadow-md justify-between items-center',
    '[tabindex]': '0',
    '(click)': 'notification().remove()',
    '(keyup)': 'notification().remove()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCard implements OnInit {
  public readonly notification = input.required<Notification>();

  private readonly element = inject(ElementRef).nativeElement as HTMLElement;
  private readonly defaultDuration = inject(DEFAULT_NOTIFICATION_DURATION);
  private readonly destroy = inject(DestroyRef);

  public ngOnInit(): void {
    timer(this.notification().duration ?? this.defaultDuration)
      .pipe(
        takeUntil(fromEvent(this.element, 'mouseenter')),
        repeat({ delay: () => fromEvent(this.element, 'mouseleave') }),
        takeUntilDestroyed(this.destroy),
      )
      .subscribe(() => {
        this.notification().remove();
      });
  }
}
