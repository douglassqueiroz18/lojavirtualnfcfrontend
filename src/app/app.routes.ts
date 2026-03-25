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
  },
  {
    path: 'gerenciar-produtos',
    loadComponent: () => import('./components/gerenciar-produtos/gerenciar-produtos').then(m=>m.GerenciarProdutos)
  }
];
