export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl: string;
  selecionado?: boolean;
  quantidade: number;
}
