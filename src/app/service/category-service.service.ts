import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  api= 'http://127.0.0.1:8000/api';

  getNewCategory: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  // categoriasChanged = new EventEmitter<void>();

  getCategory(){
    return this.http.get(`${this.api}/getCategory`);
  }

  postCategory(data:any){
    console.log('it works');
    return this.http.post(`${this.api}/newCategory`,data);
    // subscribe(() =>this.categoriasChanged.emit());
  }

  getCategoryById(id:number):Observable<Request>{
    return this.http.get<Request>(`${this.api}/getCategoryById/${id}`);
  }

  deleteCategory(id:number){
    return this.http.delete(`${this.api}/deleteCategory/${id}`);
  }

  putCategory(id:number){
    return this.http.put(`${this.api}/updateCategory/${id}`,id);
  }

  //*Emitter
  setNewCategory(category:any){
    this.getNewCategory.emit(category);
  }
}
