import { Category } from './../shared.data/category';
import { FrameElement } from './../shared.data/frame.element';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CategoryService {

    private baseUrl = 'http://localhost:19407/get/categories';
    constructor(private http: HttpClient) { }
    protected httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    getCategories(): Observable<Array<Category>> {
        return this.http.get<Array<Category>>('http://localhost:19407/get/categories');
    }

    getElementsByCategoryId(categoryId: number): Observable<Array<FrameElement>> {
        return this.http.get<Array<FrameElement>>('http://localhost:19407/' + 'get/elements/' + categoryId);
    }

    sendMessage(url: string, guid: string): Observable<void> {
        const element = {
            Url: url,
            Guid: guid
        }
        return this.http.post<void>('http://localhost:19407/send' + '', element, this.httpOptions);
    }
}
