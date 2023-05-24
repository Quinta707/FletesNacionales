import { AbstractControl } from "@angular/forms";

export class CustomValidator{
    // Number only validation
    static numeric(control: AbstractControl) {
      let val = control.value !== null ? control.value.toString() : null;
  
      if (val === null || val === '') return null;
  
      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };
  
      return null;
    }
  }