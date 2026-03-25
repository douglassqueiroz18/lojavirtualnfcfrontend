import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Importante para o ícone da foto

@Component({
  selector: 'app-gerenciar-produtos-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gerenciar-produtos-modal.html',
  styleUrl: './gerenciar-produtos-modal.scss',
})
export class GerenciarProdutosModal {
  private dialogRef = inject(MatDialogRef<GerenciarProdutosModal>);
  data = inject(MAT_DIALOG_DATA);

  // Inicializa o objeto com os dados recebidos ou valores padrão
  produto = {
    id: this.data?.id || null,
    nome: this.data?.nome || '',
    preco: this.data?.preco || 0,
    imagemUrl: this.data?.imagemUrl || ''
  };

  arquivoSelecionado: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.arquivoSelecionado = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.produto.imagemUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  salvar() {
    // Retorna o produto e o arquivo para o componente pai
    this.dialogRef.close({
      produto: this.produto,
      arquivo: this.arquivoSelecionado
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
