import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { RolesporPantalla } from 'src/app/Model/Roles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  esquemas = ['Esquema 1', 'Esquema 2', 'Esquema 3', 'Esquema 4'];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.inItForm()
  }
  inItForm()
  {
    this.form = this.formBuilder.group({
      grocery: ['', [Validators.required]]
    })
  }

}
