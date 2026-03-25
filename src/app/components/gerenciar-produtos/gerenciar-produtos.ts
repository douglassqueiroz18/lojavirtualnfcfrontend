import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Observable, map } from 'rxjs';
import { GerenciarProdutoService } from '../../services/gerenciar-produtos.service';
import { MatDialog } from '@angular/material/dialog';
import { GerenciarProdutosModal } from '../gerenciar-produtos-modal/gerenciar-produtos-modal';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-gerenciar-produtos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './gerenciar-produtos.html',
  styleUrl: './gerenciar-produtos.scss',
})
export class GerenciarProdutos {
  private produtoService = inject(GerenciarProdutoService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  produtos$: Observable<any[]> = this.produtoService.listarTodos();
  displayedColumns: string[] = ['nome', 'preco', 'acoes'];
  carregarProdutos() {
    this.produtos$ = this.produtoService.listarTodos();
  }

deletar(id: any) {
  if (confirm('Deseja realmente excluir este produto?')) {
    this.produtoService.excluir(id).subscribe({
      next: () => {
        this.snackBar.open('Produto removido!', 'OK', { duration: 2000 });

        setTimeout(() => {
          this.carregarProdutos();
          this.cdr.detectChanges();
        }, 0);
      },
      error: () => this.snackBar.open('Erro ao excluir do servidor', 'OK')
    });
  }
}

  novoProduto() {
    this.abrirModal({});
  }
  editar(produto: any) {
  this.abrirModal(produto);
  }
  private abrirModal(dados: any) {
    const dialogRef = this.dialog.open(GerenciarProdutosModal, {
      width: '450px',
      data: dados
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const arquivo = result.arquivo;
      const produto = result.produto;

      if (arquivo) {
        this.produtoService.getUploadUrl(arquivo.name, arquivo.type).subscribe({
          next: (res) => {
          console.log('Resposta do Backend:', res);

              // MUDANÇA AQUI: use o nome exato que aparece no console
              const urlParaUpload = res.uploadUrl;

              if (!urlParaUpload) {
                console.error('A URL assinada (uploadUrl) veio vazia!');
                return;
              }
            this.produtoService.uploadArquivo(urlParaUpload, arquivo).subscribe({
              next: () => {
                produto.imagemUrl = res.publicUrl;

                this.salvarProdutoFinal(produto);
              },
              error: () => this.snackBar.open('Erro no upload da imagem', 'OK')
            });
          }
        });
      } else {
        this.salvarProdutoFinal(produto);
      }
    }
  });
  }
  private salvarProdutoFinal(produto: any) {
    console.log('entrou no salvamento.');
    const operacao = produto.id
      ? this.produtoService.atualizar(produto.id, produto)
      : this.produtoService.criar(produto);

    operacao.subscribe(() => {
      this.snackBar.open('Produto salvo com sucesso!', 'OK');
      this.carregarProdutos();
    });
  }
}

