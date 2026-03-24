import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { REVEAL_READY_CLASS, REVEAL_READY_EVENT } from '../../directives/reveal.constants';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  readonly greetingRevealDelay = 520;
  readonly primaryRevealDelay = 1750;
  readonly descriptionRevealDelay = 2200;
  readonly ctaRevealDelay = 2700;
  readonly imageRevealDelay = 1750;

  private revealReadyTimeoutId?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.revealReadyTimeoutId = setTimeout(() => {
      const root = document.documentElement;

      if (!root.classList.contains(REVEAL_READY_CLASS)) {
        root.classList.add(REVEAL_READY_CLASS);
        window.dispatchEvent(new Event(REVEAL_READY_EVENT));
      }
    }, this.greetingRevealDelay + 40);
  }

  ngOnDestroy(): void {
    if (this.revealReadyTimeoutId) {
      clearTimeout(this.revealReadyTimeoutId);
      this.revealReadyTimeoutId = undefined;
    }
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
