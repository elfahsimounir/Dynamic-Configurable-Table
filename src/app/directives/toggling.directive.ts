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
  @Input() blurDiv: ElementRef | HTMLElement | undefined;
  @Input() border: ElementRef | HTMLElement | undefined;


  constructor(private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.toggleClass();
  }

  private toggleClass() {
    this.toggleHandling(this.options,'visibility');
    this.toggleHandling(this.optionsIcon,'visibility');
    this.toggleHandling(this.optionsIconUp,'visibility');
    this.toggleHandling(this.optionsIconDown,'visibility');
    this.toggleHandling(this.border,'visibility');
    this.toggleHandling(this.blurDiv,'blur');
  }

  private toggleHandling(elementRef:ElementRef | HTMLElement | undefined,answer:string) {
    if (elementRef) {
      const targetElement = (elementRef instanceof ElementRef)
      ? elementRef.nativeElement
      : elementRef;
      if(answer==='visibility'){
        if (targetElement && targetElement.classList) {
          if (targetElement.classList.contains('hidden')) {
            this.renderer.removeClass(targetElement, 'hidden' as string);
            this.renderer.addClass(targetElement, 'block' as string);
          } else{
            this.renderer.removeClass(targetElement, 'block' as string);
            this.renderer.addClass(targetElement, 'hidden' as string);
          }
      }
      }else{
        if (targetElement.classList.contains('backdrop-blur-md')) {
          this.renderer.removeClass(targetElement, 'backdrop-blur-md' as string);
        } else {
          this.renderer.addClass(targetElement, 'backdrop-blur-md' as string);
        }
      }
    }
  }
  

}


