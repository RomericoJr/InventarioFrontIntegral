import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { SalesService } from '../service/sales.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  ventas : any;

  constructor(
    private saleS : ProductService,
    private _pdfMake: SalesService
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

  btnMakePdf(){
    this._pdfMake.generatePDF(this.ventas);
  }

  deleteSale(id:any){
    console.log('product id',id)
    this.saleS.deleteSale(id).subscribe(sale =>{
      console.log(sale);
    })
  }

}
