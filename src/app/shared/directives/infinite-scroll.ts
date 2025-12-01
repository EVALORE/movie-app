import { Directive, ElementRef, inject, OnDestroy, OnInit, output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScroll implements OnInit, OnDestroy {
  public readonly scrolledToBottom = output();
  private observer?: IntersectionObserver;
  private readonly element = inject(ElementRef).nativeElement as HTMLElement;

  public ngOnInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolledToBottom.emit();
      }
    }, options);

    this.observer.observe(this.element);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
