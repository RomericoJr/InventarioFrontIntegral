import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api= 'http://127.0.0.1:8000/api/';

  getNewProduct: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  //**Emiter */
    setNewProduct(product:any){
      this.getNewProduct.emit(product);
    }


  newProduct(data:any){
    return this.http.post(`${this.api}newProduct`,data);
  }

  getProduct(){
    return this.http.get(`${this.api}getProduct`);
  }

  deleteProduct(id:any){
    return this.http.delete(`${this.api}deleteProduct/${id}`);
  }

  updateProduct(id:number,data:any){
    return this.http.post(`${this.api}updateProduct/${id}`,data);
  }

  postSale(data:any){
    return this.http.post(`${this.api}newSale`,data);
  }

  getSale(){
    return this.http.get(`${this.api}getSale`);
  }

  deleteSale(id:any){
    return this.http.delete(`${this.api}deleteSale/${id}`);
  }
}
