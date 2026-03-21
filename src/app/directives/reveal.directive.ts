import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type RevealVariant = 'up' | 'left' | 'right' | 'zoom';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  @Input('appReveal') variant: RevealVariant = 'up';
  @Input() revealDelay = 0;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, 'reveal');
    this.renderer.addClass(element, `reveal--${this.variant}`);
    this.renderer.setStyle(element, '--reveal-delay', `${this.revealDelay}ms`);

    if (!isPlatformBrowser(this.platformId) || this.prefersReducedMotion()) {
      this.reveal(element);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal(element);
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        this.reveal(element);
      },
      {
        threshold: 0.10,
        rootMargin: '0px 0px -4% 0px',
      },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private reveal(element: HTMLElement): void {
    this.renderer.addClass(element, 'is-visible');
    this.observer?.disconnect();
  }
}
