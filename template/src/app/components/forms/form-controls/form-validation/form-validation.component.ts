import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {
  public validate = false;
  public tooltipValidation = false;
  constructor() { }

  ngOnInit(): void {
  }d
   
  public submit() {
    this.validate = !this.validate;
    if(this.validate)
    {
      console.log('se supone que no hay nada')
    }
    else
    {
      console.log('se supone que hay algo')
    }
  }
  public tooltipSubmit() {
    this.tooltipValidation = !this.tooltipValidation;
  }

}
