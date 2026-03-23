import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const revealReadyClass = 'reveal-ready';
const revealReadyEvent = 'portfolio:reveal-ready';

if (typeof window !== 'undefined') {
  const markPageAsReloading = (): void => {
    document.documentElement.classList.add('is-reloading');
  };

  window.addEventListener('beforeunload', markPageAsReloading);
  window.addEventListener('pagehide', markPageAsReloading);
}

bootstrapApplication(App, appConfig)
  .then(() => {
    if (typeof window === 'undefined') {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add(revealReadyClass);
        window.dispatchEvent(new Event(revealReadyEvent));
      });
    });
  })
  .catch((err) => console.error(err));
