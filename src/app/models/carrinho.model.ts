import { Produto } from "./produtos.model";

interface ProdutoCarrinho extends Produto {
  quantidade: number;
}
