import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryServiceService } from 'src/app/service/category-service.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent  implements OnInit {

  formCategory: FormGroup = this.fb.group({
    name: [''],
    color: [''],
    // state: 1,
  });

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private categoryS: CategoryServiceService
  ) { }

  ngOnInit() {}

  async close(){
    await this.modalCtrl.dismiss();
  }

  saveCategory(){
    this.categoryS.postCategory(this.formCategory.value).subscribe(
      (res) => {
        //*Envio de emiiter
        this.categoryS.setNewCategory(res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.formCategory.value);
    this.close();
  }

  validateCtrl(ctrl: string){
    return !!this.formCategory.get(ctrl)?.errors && this.formCategory.get(ctrl)?.touched
  }

}
