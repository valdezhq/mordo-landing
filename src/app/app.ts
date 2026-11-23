import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Layout } from './shared/layout/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  imports: [
    Layout
  ],
  selector: 'app-root',
  styleUrl: './app.less',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private viewport = inject(ViewportScroller);

  ngOnInit(): void {
    let initialLang = 'pt-BR';
    if (isPlatformBrowser(this.platformId)) {
      initialLang = localStorage.getItem('mordo-lang') || 'pt-BR';
    }

    this.translate.use(initialLang);
    this.viewport.setOffset([0, 90]);
  }
}
