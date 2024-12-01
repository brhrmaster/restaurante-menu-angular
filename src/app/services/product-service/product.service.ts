import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from '../../models/models.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataUrl = '/assets/data.json';

  constructor(private http: HttpClient) {

  }

  getData(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.dataUrl);
  }
}
