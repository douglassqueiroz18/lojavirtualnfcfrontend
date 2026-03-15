import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private readonly API = '/api/produtos';

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API);
  }
}
