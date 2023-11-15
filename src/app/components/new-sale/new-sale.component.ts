import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { FillerProductsComponent } from '../filler-products/filler-products.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent  implements OnInit {

  products: any;
  productsSearch:any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private popController: PopoverController,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProduct().subscribe((product) => {
      this.products = product
      console.log('Product saved', this.products)
    })
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  showProduct(e:any){
    console.log(e.detail.value);
    const p = e.detail.value;
    const filtered:any[] = this.products.filter((prod: any) => prod.name.toLowerCase().includes(p.toLowerCase()));
    //  this.presentPopover(e.detail.value);
    console.log('test',filtered)
    this.presentPopover(filtered);
  }

  async presentPopover(data:any){
    const pop = await this.popController.create({
      component: FillerProductsComponent,
      event: data,
      side: 'right',
      componentProps:{
        products : data
      }
    });

    await pop.present();

    const info = await pop.onWillDismiss();
    if(info){
      console.log('si llego la info', info);
      this.productsSearch.push(info);
    }

  }
}
