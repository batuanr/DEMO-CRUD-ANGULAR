import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
// const API = environment.API_PRODUCT;
const API = environment.API_SERVER_PRODUCT;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public status: any;
  constructor(
    private http: HttpClient
  ) { }

  getStatus(){
    return this.status;
  }
  setStatus(status: string){
    this.status = status;
  }
  page(page, search){
    const params = page;
    return this.http.get(API + 'page?name=' + search, {params});
  }
  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(API);
  }
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(API + 'create', product);
  }
  delete(id: number): Observable<Product>{
    return this.http.delete<Product>(API + id);
  }
  getOne(id: number): Observable<Product>{
    return this.http.get<Product>(API + 'findOne/' + id);
  }
  update(id: number, product: Product): Observable<Product>{
    return this.http.put<Product>(API + 'edit/' + id, product);
  }
}
