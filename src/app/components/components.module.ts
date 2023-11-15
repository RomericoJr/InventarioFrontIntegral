import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HeaderComponent } from './header/header.component';
import { NewSaleComponent } from './new-sale/new-sale.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FillerProductsComponent } from './filler-products/filler-products.component';



@NgModule({
  declarations: [
    NewProductComponent,
    ViewProductComponent,
    HeaderComponent,
    NewSaleComponent,
    NewCategoryComponent,
    FillerProductsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NewProductComponent,
    ViewProductComponent,
    HeaderComponent,
    NewSaleComponent,
    NewCategoryComponent,
    FillerProductsComponent
  ]
})
export class ComponentsModule { }
