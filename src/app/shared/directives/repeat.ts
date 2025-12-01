import { Directive, inject, input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]',
})
export class Repeat implements OnInit {
  public readonly appRepeat = input.required<number>();
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  public ngOnInit(): void {
    this.viewContainer.clear();
    for (let index = 0; index < this.appRepeat(); index += 1) {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: index, index });
    }
  }
}
