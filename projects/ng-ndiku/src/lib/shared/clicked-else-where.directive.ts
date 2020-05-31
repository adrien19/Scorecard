import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Output,
} from '@angular/core';

@Directive({ selector: '[ndikuClickElseWhere]' })
export class ClickElsewhereDirective {
  @Output() ndikuClickedElseWhere = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the element
    if (
      targetElement &&
      !this.elementRef.nativeElement.contains(targetElement)
    ) {
      this.ndikuClickedElseWhere.emit();
    }
  }
}
