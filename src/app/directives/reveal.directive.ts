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

type ObserverBucket = {
  observer: IntersectionObserver;
  directives: Map<HTMLElement, RevealDirective>;
};

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private static readonly defaultRootMargin = '0px 0px -4% 0px';
  private static readonly reducedMotionQuery = '(prefers-reduced-motion: reduce)';
  private static readonly revealReadyClass = 'reveal-ready';
  private static readonly revealReadyEvent = 'portfolio:reveal-ready';
  private static readonly observerBuckets = new Map<string, ObserverBucket>();

  private revealTimeoutId?: ReturnType<typeof setTimeout>;
  private settleTimeoutId?: ReturnType<typeof setTimeout>;
  private revealReadyListener?: () => void;
  private isVisible = false;
  private observerKey?: string;

  @Input('appReveal') variant: RevealVariant = 'up';
  @Input() revealDelay = 0;
  @Input() revealDuration?: number;
  @Input() revealEasing?: string;
  @Input() revealRootMargin?: string;
  @Input() revealOnce = true;

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

    if (this.shouldRevealImmediately()) {
      this.show(element);
      return;
    }

    this.observeElement(element, this.getObserverOptions());
  }

  ngOnDestroy(): void {
    this.unobserveElement();
    this.clearRevealReadyListener();
    this.clearTimeouts();
  }

  private shouldRevealImmediately(): boolean {
    return (
      !isPlatformBrowser(this.platformId) ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia(RevealDirective.reducedMotionQuery).matches
    );
  }

  private getObserverOptions(): IntersectionObserverInit {
    return {
      rootMargin: this.revealRootMargin ?? RevealDirective.defaultRootMargin,
    };
  }

  private observeElement(element: HTMLElement, options: IntersectionObserverInit): void {
    const bucket = this.getObserverBucket(options);
    this.observerKey = this.getObserverKey(options);
    bucket.directives.set(element, this);
    bucket.observer.observe(element);
  }

  private handleIntersection(entry: IntersectionObserverEntry): void {
    const element = this.el.nativeElement;

    if (entry.isIntersecting) {
      this.reveal(element);
      return;
    }

    if (!this.revealOnce && this.isVisible) {
      this.reset(element);
    }
  }

  private unobserveElement(): void {
    if (!this.observerKey) {
      return;
    }

    const bucket = RevealDirective.observerBuckets.get(this.observerKey);
    const element = this.el.nativeElement;

    if (!bucket) {
      this.observerKey = undefined;
      return;
    }

    bucket.directives.delete(element);
    bucket.observer.unobserve(element);

    if (bucket.directives.size === 0) {
      bucket.observer.disconnect();
      RevealDirective.observerBuckets.delete(this.observerKey);
    }

    this.observerKey = undefined;
  }

  private getObserverKey(options: IntersectionObserverInit): string {
    return options.rootMargin ?? RevealDirective.defaultRootMargin;
  }

  private getObserverBucket(options: IntersectionObserverInit): ObserverBucket {
    const key = this.getObserverKey(options);
    let bucket = RevealDirective.observerBuckets.get(key);

    if (bucket) {
      return bucket;
    }

    const directives = new Map<HTMLElement, RevealDirective>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        directives.get(target)?.handleIntersection(entry);
      }
    }, options);

    bucket = { observer, directives };
    RevealDirective.observerBuckets.set(key, bucket);

    return bucket;
  }

  private reveal(element: HTMLElement): void {
    if (this.isVisible && this.revealOnce) {
      return;
    }

    this.queueRevealWhenReady(element);

    if (this.revealOnce) {
      this.unobserveElement();
    }
  }

  private queueRevealWhenReady(element: HTMLElement): void {
    this.clearRevealTimeout();

    if (this.isRevealReady()) {
      this.scheduleShow(element);
      return;
    }

    this.clearRevealReadyListener();
    const onRevealReady = (): void => {
      this.revealReadyListener = undefined;
      this.scheduleShow(element);
    };

    this.revealReadyListener = onRevealReady;
    window.addEventListener(RevealDirective.revealReadyEvent, onRevealReady, { once: true });
  }

  private scheduleShow(element: HTMLElement): void {
    if (this.revealDelay > 0) {
      this.revealTimeoutId = setTimeout(() => {
        this.show(element);
      }, this.revealDelay);
      return;
    }

    this.show(element);
  }

  private show(element: HTMLElement): void {
    this.renderer.addClass(element, 'is-visible');
    this.isVisible = true;

    this.clearSettleTimeout();

    this.settleTimeoutId = setTimeout(() => {
      this.renderer.setStyle(element, 'will-change', 'auto');
    }, this.revealDuration ?? 900);
  }

  private reset(element: HTMLElement): void {
    this.clearTimeouts();

    this.renderer.removeClass(element, 'is-visible');
    this.renderer.setStyle(element, 'will-change', 'transform, opacity');
    this.isVisible = false;
  }

  private clearRevealTimeout(): void {
    if (this.revealTimeoutId) {
      clearTimeout(this.revealTimeoutId);
      this.revealTimeoutId = undefined;
    }
  }

  private clearRevealReadyListener(): void {
    if (this.revealReadyListener) {
      window.removeEventListener(RevealDirective.revealReadyEvent, this.revealReadyListener);
      this.revealReadyListener = undefined;
    }
  }

  private clearSettleTimeout(): void {
    if (this.settleTimeoutId) {
      clearTimeout(this.settleTimeoutId);
      this.settleTimeoutId = undefined;
    }
  }

  private clearTimeouts(): void {
    this.clearRevealTimeout();
    this.clearSettleTimeout();
  }

  private isRevealReady(): boolean {
    return document.documentElement.classList.contains(RevealDirective.revealReadyClass);
  }
}
