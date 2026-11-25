import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgOptimizedImage } from '@angular/common';
import { Zoom } from '../../../shared/directives/zoom';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ThemeService } from '../../../core/theme.service';

@Component({
  imports: [
    TranslatePipe,
    NzGridModule,
    NzIconModule,
    NzCardModule,
    NgOptimizedImage,
    Zoom,
    NzImageModule
  ],
  selector: 'app-cards-features',
  styleUrl: './cards-features.less',
  templateUrl: './cards-features.html',
})
export class CardsFeatures {
  private readonly themeService = inject(ThemeService);

  readonly listIcon = computed(() =>
    this.themeService.isDark()
      ? 'assets/home/mordo-white-outline.svg'
      : 'assets/home/mordo-outline.svg'
  );
}
