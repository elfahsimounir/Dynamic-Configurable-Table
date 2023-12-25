import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToggling]',
  standalone: true
})
export class TogglingDirective {
  @Input() options: ElementRef | HTMLElement | undefined;
  @Input() optionsIcon: ElementRef | HTMLElement | undefined;
  @Input() optionsIconUp: ElementRef | HTMLElement | undefined;
  @Input() optionsIconDown: ElementRef | HTMLElement | undefined;


  constructor(private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.toggleClass();
  }

  private toggleClass() {
    this.toggleHandling(this.options);
    this.toggleHandling(this.optionsIcon);
    this.toggleHandling(this.optionsIconUp);
    this.toggleHandling(this.optionsIconDown);
  }

  private toggleHandling(elementRef:ElementRef | HTMLElement | undefined) {
    if (elementRef) {
      const targetElement = (elementRef instanceof ElementRef)
      ? elementRef.nativeElement
      : elementRef;
      if (targetElement && targetElement.classList) {
        if (targetElement.classList.contains('hidden')) {
          this.renderer.removeClass(targetElement, 'hidden' as string);
          this.renderer.addClass(targetElement, 'block' as string);
        } else {
          this.renderer.removeClass(targetElement, 'block' as string);
          this.renderer.addClass(targetElement, 'hidden' as string);
        }
      }
    }
  }

}


