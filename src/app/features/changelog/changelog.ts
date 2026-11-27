import { Component, inject, computed } from '@angular/core';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  imports: [
    NzTimelineModule,
    NzTagModule,
    TranslatePipe
  ],
  selector: 'app-changelog',
  styleUrl: './changelog.less',
  templateUrl: './changelog.html',
})
export class Changelog {
  private readonly themeService = inject(ThemeService);
  
  readonly listIcon = computed(() =>
    this.themeService.isDark()
      ? 'assets/home/mordo-white-outline.svg'
      : 'assets/home/mordo-outline.svg'
  );
}
