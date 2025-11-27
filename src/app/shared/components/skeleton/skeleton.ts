import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})
export class Skeleton {
  public readonly variant = input<'text' | 'rectangular' | 'circle'>('rectangular');
  public readonly width = input<string>('100%');
  public readonly height = input<string>('1rem');

  public readonly styles = computed(() => ({
    width: this.width(),
    height: this.height(),
  }));

  public readonly classes = computed(() => ({
    'h-4': this.variant() === 'text',
    'mb-2': this.variant() === 'text',
    rounded: this.variant() === 'rectangular',
    'rounded-full': this.variant() === 'circle',
  }));
}
