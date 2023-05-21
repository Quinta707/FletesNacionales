import { Component, OnInit } from '@angular/core';
import { Cargos } from '../../../../Models/Cargos';
import { ServiceService } from '../../../../Service/service.service';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  cargos!: Cargos[];
 
  constructor(private service:ServiceService){}
 
  ngOnInit(): void {
   this.service.getCargos()
   .subscribe((data: any)=>{
    console.log(1,data)
     this.cargos= data.data;
   })
  }
 }
 