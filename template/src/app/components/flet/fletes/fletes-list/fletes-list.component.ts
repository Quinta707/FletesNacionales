import { Component, OnInit } from '@angular/core';
import { Flete } from '../../../../shared/model/fletes.model';
import { ServiceService } from '../../../../shared/services/fletes.service';

@Component({
  selector: 'app-flete-list',
  templateUrl: './fletes-list.component.html',
  styleUrls: ['./fletes-list.component.scss']
})
export class FleteComponent {
  cargos!: Flete[];
 
  constructor(private service:ServiceService){}
 
  ngOnInit(): void {
    this.service.getCargos()
    .subscribe((data: any)=>{
      this.cargos= data.data;
    })
  }
 }
 
