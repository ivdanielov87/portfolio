import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { UI_READY_CLASS } from './app/directives/reveal.constants';

bootstrapApplication(App, appConfig)
  .then(() => {
    if (typeof window === 'undefined') {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add(UI_READY_CLASS);
      });
    });
  })
  .catch((err) => console.error(err));
