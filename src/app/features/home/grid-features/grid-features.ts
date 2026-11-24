import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslatePipe } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  imports: [
    NzGridModule,
    TranslatePipe,
    NzIconModule
  ],
  selector: 'app-grid-features',
  styleUrl: './grid-features.less',
  templateUrl: './grid-features.html',
})
  
export class GridFeatures {}
