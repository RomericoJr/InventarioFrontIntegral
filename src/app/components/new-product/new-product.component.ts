import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ProductService } from '../../service/product.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { priceValid } from 'src/app/validators/price.validator';
import { dateValid } from 'src/app/validators/date.validator';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})

export class NewProductComponent  implements OnInit {

  caduca :boolean = false;

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

  edit = false;
  btn = 'Registrar';
  // tittle='Registrar producto';
  formProduct! :FormGroup;


  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private route: Router,
    private compresX: NgxImageCompressService,
    private prodService: ProductService,
    private categoryService: CategoryServiceService,
    private _nParams : NavParams,
  ) {
    let info = this._nParams.get('dataKey');
    console.log('dataKey',info);



    this.formProduct = this.fb.group({
      name: ['', [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(10)]],
    price: [0, Validators.required],
    price_sale: [0, Validators.required],
    stock: ['', Validators.required],
    expired: [null],
    image: ['',],
    code: ['0', ],
    // state: ['', Validators.required],
    category_id: ['', Validators.required],
    // _method: ['PUT'],
    },
    {validators: [priceValid, dateValid]})
    this.getCategories();

    if(info){
      this.edit = true;
      this.btn = 'Actualizar';
      // this.tittle='Editar producto'
      this.formProduct.reset(info);
      this.imagePr = info.image;
    }
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
        // this.route.navigate(['/tabs/tab1']);
        //*Envio de emiiter
        this.prodService.setNewProduct(res);
      } );
      console.log(data);
      this.close();
    }
  }

//hacer una funcion para actualizar el producto usando id y que el dato que envie sea un formdata
  // updateProduct(id:any, data:any){
  //   console.log(this.formProduct.value);
  //   this.close();

  //   if(this.formProduct.invalid){
  //     const formData = new FormData();


  //     let data = this.formProduct.getRawValue();

  //     for(const dataKey in data){
  //       formData.append(dataKey,data[dataKey]);
  //     }

  //     if(this.currentFile){
  //       formData.append('image',this.currentFile[0])
  //     }

  //     this.prodService.updateProduct(id,formData).subscribe( res =>{
  //       console.log(res);
  //       // this.route.navigate(['/tabs/tab1']);
  //       //*Envio de emiiter
  //       this.prodService.setNewProduct(res);
  //     } );
  //     console.log(data);
  //     this.close();
  //   }
  // }

async updateProduct(id:any, data:any){

  const formData = new FormData();
  formData.append('_method','PUT');
  formData.append('name',this.formProduct.get('name')?.value);
  formData.append('price',this.formProduct.get('price')?.value);
  formData.append('price_sale',this.formProduct.get('price_sale')?.value);
  formData.append('stock',this.formProduct.get('stock')?.value);
  formData.append('expired',this.formProduct.get('expired')?.value);
  formData.append('code',this.formProduct.get('code')?.value);
  formData.append('category_id',this.formProduct.get('category_id')?.value);
  // formData.append('image',this.formProduct.get('image')?.value);

      //validar si se selecciono una imagen nueva o no para actualizar
      const imageFile = this.formProduct.get('image')?.value;
      if (imageFile instanceof File) {
        formData.append('image', imageFile);
      }

      const formDataObject:any = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
    // Imprimir el objeto JSON en la consola
    console.log('formData para enviar:', formDataObject);

    this.prodService.updateProduct(id,formData).subscribe( res =>{
      console.log(res);
      // this.route.navigate(['/tabs/tab1']);
      //*Envio de emiiter
      this.prodService.setNewProduct(res);
      this.close();
    } );
}
  btnAcction(){
    if(this.edit){
      this.updateProduct(this._nParams.get('dataKey').id, this.formProduct.value);
    } else {
      this.save();
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

  validarPrecio(){
    return !!this.formProduct?.errors?.['priceError']
  }

  validateDate(){
    return !!this.formProduct?.errors?.['expiredError']
  }

  addCaducidad(){
    this.caduca = !this.caduca;
  }

}
