import { Component, inject, OnInit, PLATFORM_ID, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produtos.service';
import { Produto } from '../../models/produtos.model';
import { Carrinho } from '../carrinho/carrinho';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
interface ProdutoCarrinho extends Produto {
  quantidade: number;
}
@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule,MatDialogModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos implements OnInit {
  private service = inject(ProdutoService);
  private platformId = inject(PLATFORM_ID);
  produtos = signal<ProdutoCarrinho[]>([]);
  private dialog = inject(MatDialog);
  totalItens = computed(() =>
    this.produtos().reduce((acc, p) => acc + (p.quantidade || 0), 0)
  );

  valorTotal = computed(() =>
    this.produtos().reduce((acc, p) => acc + (p.preco * (p.quantidade || 0)), 0)
  );

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.service.listarTodos().subscribe({
        next: (dados) => {
          const inicializados: ProdutoCarrinho[] = dados.map(p => ({
            ...p,
            quantidade: 0
          }));
          this.produtos.set(inicializados);
        }
      });
    }
  }

  adicionar(produto: Produto) {
    this.produtos.update(lista =>
      lista.map(p => p.id === produto.id
        ? { ...p, quantidade: (p.quantidade || 0) + 1 }
        : p
      )
    );
  }

  remover(produto: Produto) {
  this.produtos.update(lista =>
    lista.map(p => {
      if (p.id === produto.id && (p.quantidade || 0) > 0) {
        const novaQtd = p.quantidade - 1;
        (produto as any).quantidade = novaQtd;
        return { ...p, quantidade: novaQtd };
      }
      return p;
    })
  );
  }
  abrirCarrinho() {
    const selecionados = this.produtos().filter(p => p.quantidade > 0);
    this.dialog.open(Carrinho, {
      width: '90%',
      maxWidth: '450px',
      panelClass: 'custom-modal',
      data: {
        itens: selecionados,
        valorTotal: this.valorTotal(),
        onAdd: (item: any) => this.adicionar(item),
        onRemove: (item: any) => this.remover(item)
      }
    });
  }
}
