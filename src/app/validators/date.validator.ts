import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import * as moment from 'moment';


export function dateValid(ctrl: AbstractControl):ValidationErrors | null{
  const expired = ctrl?.get('expired')?.value;
  console.log('caducidad: ',expired);
  const dateExpired = moment(expired);
  // console.log('date', date);
  const today = moment().format();
  const dateBefore = dateExpired.isBefore(today);
  console.log('date before', dateBefore);

  if(dateBefore){
    console.log('invalid date');

    return ({'expiredError': true})
  }
  console.log('valid date');


  return (null);

}
