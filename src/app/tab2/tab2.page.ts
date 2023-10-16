import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductComponent } from '../components/new-product/new-product.component';
import { ViewProductComponent } from '../components/view-product/view-product.component';
import { NewSaleComponent } from '../components/new-sale/new-sale.component';
import { NewCategoryComponent } from '../components/new-category/new-category.component';
import { CategoryServiceService } from '../service/category-service.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  titulo = "mis_productos"
  constructor(
    private modalCtrl: ModalController,
    private categoryService : CategoryServiceService
  ) {}

  ngOnInit(){
    this.getCategory();
    this.categoryService.getNewCategory.subscribe(category =>{
      if(category){
        this.categorias.push(category);
      }
    });

  }
  categorias:any = [];

  getCategory(){
    this.categoryService.getCategory().subscribe(
      res=>{
        console.log(res);

        this.categorias = res;
        this.categorias = this.categorias.slice(0, 5);
      },
      err=>{
        console.log(err);
      }
    )
  }

  onSearchChange(event:any){

  }

  vermas(){

  }
  deleteC(id:any){
    this.categoryService.deleteCategory(id).subscribe(
      data=>{
        console.log('works');
      }
    )
  }

  prueba(){
    console.log('works prueba');

  }

  async openNewProduct(){
    console.log('works bootmS');

    const modal = await this.modalCtrl.create({
      component: NewProductComponent,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
  }

  async openViewProduct(){
    console.log('works bootmS');

    const modal = await this.modalCtrl.create({
      component: ViewProductComponent,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
  }

  async openNewSale(){
    const modal = await this.modalCtrl.create({
      component: NewSaleComponent,
      mode: 'ios',
      initialBreakpoint: .4,
      backdropDismiss: false,
    });
    await modal.present();
  }


  async openNewCategory(){
    const modal = await this.modalCtrl.create({
      component: NewCategoryComponent,
      mode: 'ios',
      initialBreakpoint: .4,
      backdropDismiss: false,
    });
    await modal.present();
  }



}
