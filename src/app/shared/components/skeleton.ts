import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'block rounded animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
    '[style]': `
      {
        width: this.width(),
        height: this.height(),
      }
    `,
    '[class]': `
      {
        'h-4': this.variant() === 'text',
        'mb-2': this.variant() === 'text',
      }
    `,
  },
})
export class Skeleton {
  public readonly variant = input<'text' | 'rectangular'>('rectangular');
  public readonly width = input<string>('100%');
  public readonly height = input<string>('1rem');
}
