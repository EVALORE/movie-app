import { assertInInjectionContext, ElementRef, inject } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function injectNativeElement<T extends Element>(): T {
  assertInInjectionContext(injectNativeElement);
  return inject<ElementRef<T>>(ElementRef).nativeElement;
}
