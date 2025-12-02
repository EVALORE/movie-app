import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
})
export class Repeat {
  public readonly repeat = input.required<number>({ alias: 'appRepeat' });
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      for (let index = 0; index < this.repeat(); index += 1) {
        this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: index, index });
      }
    });
  }
}
