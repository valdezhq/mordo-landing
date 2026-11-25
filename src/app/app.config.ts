import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  MenuOutline,
  SunOutline,
  MoonOutline,
  GlobalOutline,
  CodeOutline,
  ThunderboltOutline,
  LockOutline,
  KeyOutline,
  DatabaseOutline,
  ClusterOutline,
  TeamOutline,
  FileSearchOutline,
  ControlOutline
} from '@ant-design/icons-angular/icons';

registerLocaleData(pt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })),
    provideClientHydration(),
    provideNzI18n(pt_BR),
    provideNzDateFnsAdapter(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'pt-BR',
      lang: 'pt-BR'
    }),
    provideHttpClient(),
    provideNzIcons([
      MenuOutline,
      SunOutline,
      MoonOutline,
      GlobalOutline,
      CodeOutline,
      ThunderboltOutline,
      LockOutline,
      KeyOutline,
      DatabaseOutline,
      ClusterOutline,
      TeamOutline,
      FileSearchOutline,
      ControlOutline
    ])
  ],
};
