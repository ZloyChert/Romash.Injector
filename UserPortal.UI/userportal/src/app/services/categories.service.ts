import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Category } from './../entities/category';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private httpClient: HttpClient, private http: Http) {
    super();
  }

  getCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.baseUrl + 'get/categories');
  }

  createCategory(name: string): Observable<number> {
    const query = { Name: name };
    return this.httpClient.post<number>(this.baseUrl + 'create/category', query, this.httpOptions);
  }

  activateCategory(id: number): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + 'activate/category', id, this.httpOptions);
  }

  disactivateCategory(id: number): Observable<void> {
    return this.httpClient.put<void>(this.baseUrl + 'disactivate/category', id, this.httpOptions);
  }

  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl + 'delete/category/' + id);
  }

}
