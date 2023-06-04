import { Component, QueryList, ViewChildren } from '@angular/core';
import { Grafica } from '../../../../shared/model/grafica.model';
import { TableService } from '../../../../shared/services/grafica.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions } from 'src/app/shared/data/dashboard/default';

@Component({
  selector: 'app-grafica-lst',
  templateUrl: './grafica-lst.component.html',
  styleUrls: ['./grafica-lst.component.scss']
})
export class graficaLstComponent {
  
   constructor(public calendar: NgbCalendar,private _formBuilder: FormBuilder, public service: TableService) {}
   getToday(): NgbDateStruct {
    const today = this.calendar.getToday();
    return { year: today.year, month: today.month, day: today.day };
  }
  public validate = false;
  categorias : any[] = []
  conteo : any[] = []
  graficaEnvio : Grafica = new Grafica()
  departamentosDDL: any[] = []
  ngOnInit() {
    
    this.service.getDepartamenos()
    .subscribe((data: any) =>{
      
      this.departamentosDDL = data.data.map((item:any) =>( 
        {
        value: item.depa_Id,
        label: item.depa_Nombre
      })) 
    })
     
     this.firstFormGroup = this._formBuilder.group({
       flet_Inicio: ['', Validators.required],
       flet_Fin: ['', Validators.required]
     });
 
   }
   
    firstFormGroup: FormGroup; // primer formulario
  
    primary_color = localStorage.getItem('primary_color') || '#66368e';
    ChartOptions: ChartOptions = {
      series: [
        {
            name: "Conteo",
            data: this.conteo
        }
    ],
    colors: [this.primary_color],
    chart: {
        type: "bar",
        height: 350,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    xaxis: {
        categories: this.categorias
    }
    }

    fletInicio: any[] = []


    Filtrar()
    {      
        this.categorias = []
        this.conteo = []

        console.log(this.graficaEnvio)
        this.service.getGrafica(this.graficaEnvio)
        .subscribe((data: any) => {
          data.forEach(element => {
            this.categorias.push(element.tray_DepaDescripcion)
            this.conteo.push(element.tray_Conteo)
          });
          this.ChartOptions = {
            series: [
              {
                  name: "Conteo",
                  data: this.conteo
              }
          ],
          colors: [this.primary_color],
          chart: {
              type: "bar",
              height: 350,
              toolbar: {
                  show: false
              }
          },
          plotOptions: {
              bar: {
                  horizontal: true
              }
          },
          xaxis: {
              categories: this.categorias
          }
          }
        })
      }
}
