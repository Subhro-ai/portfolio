import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import MyPreset from './custom.theme';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: MyPreset,
                options: {
                  prefix: 'p',
                  darkModeSelector: ".my-app-dark",
              }
            }
        })
  ]
};
