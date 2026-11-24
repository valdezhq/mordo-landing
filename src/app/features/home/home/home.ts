import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { CardsFeatures } from '../cards-features/cards-features';
import { RowFeatures } from '../row-features/row-features';
import { GridFeatures } from '../grid-features/grid-features';
import { Contact } from '../contact/contact';

@Component({
  imports: [
    Hero,
    CardsFeatures,
    RowFeatures,
    GridFeatures,
    Contact
  ],
  selector: 'app-home',
  styleUrl: './home.less',
  templateUrl: './home.html',
})
export class Home {}
