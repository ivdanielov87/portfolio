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
  private revealTimeoutId?: ReturnType<typeof setTimeout>;
  private readonly mobileMediaQuery = '(max-width: 640px)';

  @Input('appReveal') variant: RevealVariant = 'up';
  @Input() revealDelay = 0;
  @Input() revealDuration?: number;
  @Input() revealEasing?: string;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, 'reveal');
    this.renderer.addClass(element, `reveal--${this.variant}`);

    if (this.revealDuration !== undefined) {
      this.renderer.setStyle(element, '--reveal-duration', `${this.revealDuration}ms`);
    }

    if (this.revealEasing !== undefined) {
      this.renderer.setStyle(element, '--reveal-easing', this.revealEasing);
    }

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
      this.getObserverOptions(),
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.revealTimeoutId) {
      clearTimeout(this.revealTimeoutId);
    }
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private getObserverOptions(): IntersectionObserverInit {
    if (window.matchMedia(this.mobileMediaQuery).matches) {
      return {
        threshold: 0.1,
        rootMargin: '0px 0px -2% 0px',
      };
    }

    return {
      threshold: 0.18,
      rootMargin: '0px 0px -12% 0px',
    };
  }

  private reveal(element: HTMLElement): void {
    if (this.revealDelay > 0) {
      this.revealTimeoutId = setTimeout(() => {
        this.renderer.addClass(element, 'is-visible');
      }, this.revealDelay);
    } else {
      this.renderer.addClass(element, 'is-visible');
    }

    this.observer?.disconnect();
  }
}
