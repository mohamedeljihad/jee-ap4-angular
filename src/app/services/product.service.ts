import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private host = 'http://localhost:8089';

  constructor(private http: HttpClient) {}

  /** Recherche paginée : json-server renvoie le total dans l'en-tête X-Total-Count. */
  searchProducts(keyword = '', page = 1, size = 4): Observable<HttpResponse<Product[]>> {
    return this.http.get<Product[]>(
      `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`, { observe: 'response' });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }

  checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`, { checked: !product.checked });
  }

  deleteProduct(product: Product): Observable<any> {
    return this.http.delete(`${this.host}/products/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
