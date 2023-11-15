import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { FillerProductsComponent } from '../filler-products/filler-products.component';
import { ProductService } from '../../service/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { stockVentasValidate } from 'src/app/validators/stockVentas.validator';

export interface NewSale{
  amount: number;
  total: number;
  profit:number;
  hour: string;
  product_id: string;
}


@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent  implements OnInit {



  color = 'success';
  products: any;
  productsSearch:any[] = [];

  sendSale:any;

  newSale:NewSale = {} as NewSale;

  formCSale: FormGroup = this.fb.group({
    amount: [],
    total: [],
    profit:[],
    hour: [],
    product_id: []
    // state: 1,
  },
  {validators:[stockVentasValidate]});

  constructor(
    private modalCtrl: ModalController,
    private popController: PopoverController,
    private productService: ProductService,
    private fb: FormBuilder
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

  validarStock(){
    return !!this.formCSale.errors?.['stockError'];
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
      console.log('De aqui ocupare', info.data.item);
      this.sendSale = info.data.item;
      this.productsSearch.push(info);
      if(info.data.item.stock < 15){
        this.color = 'danger';
      }

      // const formCSale = new FormData();

      // FormData.append('amount',info.data.item.price_sale);

      // this.newSale.amount = info.data.item.price_sale;
      // this.newSale.total = info.data.item.price_sale;
      // this.newSale.profit = info.data.item.price + 50 ;
      // this.newSale.product_id = info.data.item.id;
      // this.newSale.hour = new Date().toLocaleTimeString();

      // console.log('Enviar estos datos al back',this.newSale);

      // this.productService.postSale(this.newSale).subscribe(data =>{
      //   console.log('works',data);
      //   this.close();

      // })
    }

  }

  saveSale(){
    console.log('enviar sale', this.sendSale);
    console.log(this.formCSale.value , 'amount')
    const sale = this.formCSale.value;
      const venta = {
        amount: sale.amount,
        total: sale.amount * this.sendSale.price,
        profit: (sale.amount * this.sendSale.price_sale) - (sale.amount * this.sendSale.price),
        hour: new Date().toLocaleTimeString(),
        product_id: this.sendSale.id
      }
      this.productService.postSale(venta).subscribe(data => {
        console.log(data)
      })
    console.log('datos registrados', venta)
  }
}
