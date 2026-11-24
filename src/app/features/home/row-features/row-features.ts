import { Component } from '@angular/core';
import { NzGridModule, NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { TranslatePipe } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    NzGridModule,
    NzColDirective,
    NzRowDirective,
    TranslatePipe,
    NzIconModule,
    RouterLink
  ],
  selector: 'app-row-features',
  styleUrl: './row-features.less',
  templateUrl: './row-features.html',
})
export class RowFeatures {}
