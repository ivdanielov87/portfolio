import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { RELOAD_CLASS } from './app/directives/reveal.constants';

if (typeof window !== 'undefined') {
  const markPageAsReloading = (): void => {
    document.documentElement.classList.add(RELOAD_CLASS);
  };

  window.addEventListener('beforeunload', markPageAsReloading);
  window.addEventListener('pagehide', markPageAsReloading);
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
