import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

const productsUrl = "http://localhost:3000/products";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http: HttpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${productsUrl}/${id}`);
  }

  addProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(productsUrl, p);
  }

  updateProduct(id: string, updatedProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${productsUrl}/${id}`, updatedProduct);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${productsUrl}/${id}`);
  }

}


