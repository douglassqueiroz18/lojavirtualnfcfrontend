import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);

  private readonly API_URL = '/api';

  criarSessaoPagamento(dadosPedido: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/checkout`, dadosPedido);
  }

  obterSessionId(): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/session-id`);
  }
}
