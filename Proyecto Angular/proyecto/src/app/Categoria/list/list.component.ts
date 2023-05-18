import { Component } from '@angular/core';
import { Categoria } from 'src/app/Model/Categoria';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
 categorias!: Categoria[];

 constructor(private service:ServiceService){}

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  this.service.getCategoria()
    .subscribe(data=> {
        this.categorias = data;
    })
  }
}

