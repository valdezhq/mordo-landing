import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Changelog } from './features/changelog/changelog';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'changelog', component: Changelog }
];
