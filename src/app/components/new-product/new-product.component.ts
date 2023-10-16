import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ProductService } from '../../service/product.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})

export class NewProductComponent  implements OnInit {

  imagePr= './assets/noimage.png'
  currentFile?: any[] = [];
  categoryArray: any[] = [];

  // formProduct: FormGroup = this.fb.group({
  //   name: [''],
  //   image: [''],
  //   code: [''],
  //   categoria: [''],
  //   price: [''],
  //   inventario: [''],
  //   adquisition: [''],
  //   vencimiento: [''],
  //   stock: [''],
  // })

  formProduct! :FormGroup;


  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private route: Router,
    private compresX: NgxImageCompressService,
    private prodService: ProductService,
    private categoryService: CategoryServiceService
  ) {
    this.formProduct = this.fb.group({
      name: ['', [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10)]],
    price: ['', Validators.required],
    price_sale: ['', Validators.required],
    stock: ['', Validators.required],
    expired: ['', Validators.required],
    image: ['', Validators.required],
    code: ['', Validators.required],
    // state: ['', Validators.required],
    category_id: ['', Validators.required],
    })
    this.getCategories();
  }

  ngOnInit() {}

  save(){
    console.log(this.formProduct.value);
    this.close();

    if(this.formProduct.invalid){
      const formData = new FormData();

      let data = this.formProduct.getRawValue();

      for(const dataKey in data){
        formData.append(dataKey,data[dataKey]);
      }

      if(this.currentFile){
        formData.append('image',this.currentFile[0])
      }

      this.prodService.newProduct(formData).subscribe( res =>{
        console.log(res);
        this.route.navigate(['/tabs/tab1']);
      } );
      console.log(data);
    }

  }

  async close(){
    await this.modalCtrl.dismiss();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  imageProduct(event:any){
    this.compresX.uploadFile().then(({image, orientation})=>{
      this.generarURL(image);
      const blob = this.dataURItoBlob(image);
      this.currentFile?.push(blob);
      // this.currentFile![0] = blob;

  })
}

generarURL(image: any){
  const byteString = atob(image.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: '' });
  // Crear la URL de la imagen
  const imageUrl = URL.createObjectURL(blob);
  console.log(imageUrl);
  // Utilizar la URL de la imagen
  this.imagePr = imageUrl;
  document.getElementById("imgProf")?.setAttribute(
    'src', imageUrl);
    // this.formGroup.get('image').patchValue(imageUrl)
  }

  dataURItoBlob(dataURI:any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString})

  }

  getCategories(){
    this.categoryService.getCategory().subscribe( (res:any) =>{
      console.log(res);
      this.categoryArray = res;
    } );
  }

}
