import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  data = inject<{
    itens: any[];
    onAdd: (item: any) => void;
    onRemove: (item: any) => void;
  }>(MAT_DIALOG_DATA);

  private dialogRef = inject(MatDialogRef<Carrinho>);
  private pedido = inject(PedidoService);
  private pedidoService = inject(PedidoService);
  itensNoCarrinho = signal<any[]>([...this.data.itens]);

  quantidadeItens = computed(() => {
    const qtd = this.itensNoCarrinho().reduce((acc, item) => acc + item.quantidade, 0);
    return qtd;
  });
  totalNoModal = computed(() => {
    const total = this.itensNoCarrinho().reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0,
    );
    return total;
  });

  removerItem(item: any) {
    this.data.onRemove(item);
    const listaAtualizada = this.itensNoCarrinho()
      .map(i => i.id === item.id ? { ...i, quantidade: item.quantidade } : i)
      .filter(i => i.quantidade > 0);
    this.itensNoCarrinho.set(listaAtualizada);
    console.log('teste: ', this.itensNoCarrinho());
    if (this.quantidadeItens() === 0) {
      this.fechar();
    }
  }

  finalizar() {
  const dadosParaEnvio = {
    itens: this.itensNoCarrinho(),
    valorTotal: this.totalNoModal(),
    dataPedido: new Date().toISOString()
  };

  console.log('🚀 Enviando pedido para o backend:', dadosParaEnvio);

  this.pedidoService.criarSessaoPagamento(dadosParaEnvio).subscribe({
    next: (response: any) => {
      if (response && response.paymentLink) {
        console.log('✅ Redirecionando para o PagBank...');
        window.location.href = response.paymentLink;
      } else {
        console.error('⚠️ Backend não retornou o link de pagamento:', response);
      }
    },
    error: (err) => {
      console.error('❌ Erro na comunicação com o servidor:', err);
      // Aqui você poderia mostrar um snackbar ou alert de erro
    }
  });
}

  fechar() {
    this.dialogRef.close();
  }
}
