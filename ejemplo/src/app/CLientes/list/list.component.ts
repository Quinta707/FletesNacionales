import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Model/Clientes';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {  
  clientes!: Cliente[];
  constructor(private service: ServiceService, private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.getCliente()
    .subscribe((data: any) => {
      this.clientes = data.data
    });
  }

  Editar(cli:Cliente):void {
    localStorage.setItem('id', cli.carg_Id.toString());
    alert(localStorage.getItem('id'));
    this.router.navigate(['edit']);
  }

}
