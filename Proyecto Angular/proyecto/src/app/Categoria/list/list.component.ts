import { Component } from '@angular/core';
import { Categoria } from 'src/app/Model/Categoria';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
 categorias!: Categoria[];

 constructor(private service:ServiceService, private router:Router){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  this.service.getCategoria()
    .subscribe((data:any)=> {
        this.categorias = data.data;
    })
  }

  Editar(categoria: Categoria){
    localStorage.setItem("id", categoria.carg_Id.toString());
    this.router.navigate(["editar"]);
  }
}

