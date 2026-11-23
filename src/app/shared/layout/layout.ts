import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    NzMenuModule,
    NzLayoutModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzIconModule,
    NzDropdownModule,
    NzSwitchModule,
    FormsModule,
    NzTooltipModule,
    TranslatePipe,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.less',
})
export class Layout {
  private router = inject(Router);
  private translate = inject(TranslateService);
  private themeService = inject(ThemeService);
  private document = inject(DOCUMENT);

  isDark = this.themeService.isDark;
  setTheme(isDark: boolean): void {
    this.themeService.setDark(isDark);
  }

  mobileNavOpen = signal(false);

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
    localStorage.setItem('mordo-lang', lang);
  }

  scrollToContact(): void {
    this.closeMobileNav();
    if (this.router.url === '/' || this.router.url.startsWith('/home')) {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    this.router.navigateByUrl('/home').then(() => {
      requestAnimationFrame(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}
