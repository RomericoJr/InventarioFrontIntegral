import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api= 'http://127.0.0.1:8000/api/';

  constructor(
    private http: HttpClient
  ) { }


  newProduct(data:any){
    return this.http.post(`${this.api}newProduct`,data);
  }
}
