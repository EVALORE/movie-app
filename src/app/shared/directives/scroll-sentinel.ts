import { Directive, OnDestroy, output } from '@angular/core';
import { injectNativeElement } from '../../core/injectors/native-element';

@Directive({
  selector: '[appScrollSentinel]',
})
export class ScrollSentinel implements OnDestroy {
  private readonly element = injectNativeElement<HTMLElement>();

  public readonly visible = output();

  private observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      this.visible.emit();
    }
  });

  constructor() {
    this.observer.observe(this.element);
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
