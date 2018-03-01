import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Category } from './../entities/category';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private baseUrl = 'http://localhost:19407/get/categories';
    constructor(private httpClient: HttpClient, private http: Http) { }

    protected httpCall<T>(call: () => Observable<Response>): Observable<T> {
        return call().map(res => { return this.respodnseToObject<T>(res); });
    }

    private respodnseToObject<T>(res: Response): T {
        return (res.json() || {}) as T;
    }

    getCategories(): Observable<Array<Category>> {
        return this.httpClient.get<Array<Category>>('http://localhost:19407/get/categories');
    }

    createCategory(name: string): Observable<number> {
        return this.httpClient.post<number>('http://localhost:19407/create/category', { Name: name }, this.httpOptions);
    }

    createCategory1(name: string): Observable<number> {
        return this.httpCall<number>(() => this.http.post('http://localhost:19407/create/category', { Name: name }));
    }
}
