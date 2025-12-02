import { Directive, ElementRef, inject, OnDestroy, output } from '@angular/core';

@Directive({
  selector: '[appScrollSentinel]',
})
export class ScrollSentinel implements OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

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
