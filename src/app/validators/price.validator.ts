import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function priceValid(ctrl: AbstractControl):ValidationErrors | null{

    const price: number = ctrl?.get('price')?.value;
    const priceV:number = ctrl?.get('price_sale')?.value;
    // console.log(price, priceV);
    if( priceV <= price){
        // console.log('no es valido');
        return ({'priceError': true})
    }
    return null;
}
