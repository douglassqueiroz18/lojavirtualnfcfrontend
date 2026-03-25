import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GerenciarProdutoService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/produtos';

  criar(produto: any): Observable<any> {
    console.log('Dados enviados:', produto);
    return this.http.post<any>(this.API_URL, produto);
  }

  atualizar(id: number, produto: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, produto);
  }

  excluir(id: string | number): Observable<void> {
    console.log('passou por aqui com id: ', id);
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  obterPorId(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
getUploadUrl(nomeArquivo: string, contentType: string): Observable<{ uploadUrl: string, publicUrl: string }> {
  return this.http.get<{ uploadUrl: string, publicUrl: string }>(`${this.API_URL}/upload-url`, {
    params: { nomeArquivo, contentType }
  });
}

  uploadArquivo(urlAssinada: string, arquivo: File): Observable<any> {
    return this.http.put(urlAssinada, arquivo, {
      headers: {
        'Content-Type': arquivo.type,
        'x-amz-acl': 'public-read' // Importante para o Space da DigitalOcean
      }
    });
  }
}
