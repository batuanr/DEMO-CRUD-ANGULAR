import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/Category';
// const API = environment.API_CATEGORY;
const API = environment.API_SERVER_CATEGORY;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>(API);
  }
  findOne(id: number): Observable<Category>{
    return this.http.get<Category>(API + id);
  }
  constructor(
    private http: HttpClient
  ) { }
}
