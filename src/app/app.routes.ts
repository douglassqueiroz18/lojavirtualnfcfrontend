import { Produtos } from './components/produtos/produtos';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () => import('./components/produtos/produtos').then(m => m.Produtos)
  },
  {
    path: 'monstruario',
    loadComponent: () => import('./components/monstruario/monstruario').then(m=>m.Monstruario)
  }
];
