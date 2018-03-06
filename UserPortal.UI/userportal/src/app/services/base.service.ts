import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class BaseService {
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected baseUrl = 'http://localhost:19407/';
}
