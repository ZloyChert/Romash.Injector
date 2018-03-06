import { HttpClient } from '@angular/common/http';
import { FrameElement } from './../entities/element';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class ElementsService extends BaseService {

    constructor(private http: HttpClient) {
      super();
    }

    getElementsByCategoryId(categoryId: number): Observable<Array<FrameElement>> {
        return this.http.get<Array<FrameElement>>(this.baseUrl + 'get/elements/' + categoryId);
    }

    createElement(element: FrameElement): Observable<FrameElement> {
      return this.http.post<FrameElement>(this.baseUrl + 'create/element', element, this.httpOptions);
    }

    deleteElement(id: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + 'get/elements/' + id);
    }
}
