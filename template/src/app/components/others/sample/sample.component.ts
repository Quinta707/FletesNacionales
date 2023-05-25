import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
  cargos!: Cargos[];
 
  constructor(){}
 
  ngOnInit(): void {
   this.service.getCargos()
   .subscribe((data: any)=>{
    console.log(1,data)
     this.cargos= data.data;
   })

  }
 }
 
