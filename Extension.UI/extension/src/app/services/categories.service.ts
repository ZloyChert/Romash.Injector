import { HttpClient } from '@angular/common/http';
import { Category } from './../shared.data/category';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

    private baseUrl = 'http://localhost:19407/get/categories';
    constructor(private http: HttpClient) { }

    getCategories(): Observable<Array<Category>> {
        return this.http.get<Array<Category>>('http://localhost:19407/get/categories');
    }
}
