import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [
    RouterLink,
    NzGridModule,
    TranslatePipe
  ],
  selector: 'app-hero',
  styleUrl: './hero.less',
  templateUrl: './hero.html',
})

export class Hero {
  scrollToCards(): void {
    const cardsSection = document.getElementById('cards-section');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth'});
    }
  }
}