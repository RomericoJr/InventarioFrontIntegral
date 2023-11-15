import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filler-products',
  templateUrl: './filler-products.component.html',
  styleUrls: ['./filler-products.component.scss'],
})
export class FillerProductsComponent  implements OnInit {

  products: any[] = [];
  // myProducts:any[] = [];

  constructor(
    private _popCtrl : PopoverController
  ) { }

  ngOnInit() {
    // this.myProducts = this.products;
    console.log(this.products);
  }

  selectProduct(data:any){
    console.log(data);
    this._popCtrl.dismiss(
      {item:data}
    )
  }

}
