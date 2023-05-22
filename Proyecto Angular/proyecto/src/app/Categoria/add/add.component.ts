import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/Model/Categoria';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  categoria:Categoria = new Categoria();
  constructor(private service: ServiceService, private router:Router){}

  Guardar(){
    this.service.createCategoria(this.categoria)
    .subscribe((data:any)=>{
      alert("Se agregó con éxito");
      this.router.navigate(["index"]);
    })
  }


}