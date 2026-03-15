import { Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { Produtos } from '../produtos/produtos';

@Component({
  selector: 'app-monstruario',
  standalone: true,
  imports: [Header, Produtos],
  template: `
    <app-header [quantidade]="quantidadeSelecionada()"></app-header>

    <main class="bg-gray-50 min-h-screen pt-4">
      <app-produtos (onSelecaoChange)="atualizarContagem($any($event))"></app-produtos>
    </main>
  `,
})
export class Monstruario {
  quantidadeSelecionada = signal(0);

  atualizarContagem(listaProdutos: any[]) {
    const selecionados = listaProdutos.filter((p) => p.selecionado).length;
    this.quantidadeSelecionada.set(selecionados);
  }
}
