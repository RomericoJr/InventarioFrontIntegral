import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  ventas : any;

  constructor(
    private saleS : ProductService
  ) {
    this.saleS.getSale().subscribe(sale =>{
      this.ventas = sale;
      console.log(sale);
    })
  }
  titulo = 'Reportes';
  onSearchChange(event: any){
    console.log('HOLA');

  }

  deleteSale(id:any){
    console.log('product id',id)
    this.saleS.deleteSale(id).subscribe(sale =>{
      console.log(sale);
    })
  }

}
