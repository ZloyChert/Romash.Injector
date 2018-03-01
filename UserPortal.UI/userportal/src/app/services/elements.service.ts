import { HttpClient } from '@angular/common/http';
import { FrameElement } from './../entities/element';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ElementsService {

    private baseUrl = 'http://localhost:19407/get/categories';
    constructor(private http: HttpClient) { }

    getElements(categoryId: number): Observable<Array<FrameElement>> {
        return this.http.get<Array<FrameElement>>('http://localhost:19407/get/elements' + categoryId);
    }
}
