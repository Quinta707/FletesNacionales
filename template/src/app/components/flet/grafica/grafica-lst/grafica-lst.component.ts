import { Component, QueryList, ViewChildren } from '@angular/core';
import { Grafica } from '../../../../shared/model/grafica.model';
import { TableService } from '../../../../shared/services/grafica.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/NgbdSortableHeader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions } from 'src/app/shared/data/dashboard/default';
import Swal from 'sweetalert2';

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
  colores: any[] = []
  graficaEnvio : Grafica = new Grafica()
  depa : any
  departamentosDDL: any[] = []
  ngOnInit() {
    
    this.service.getDepartamenos()
    .subscribe((data: any) =>{
      console.log(data)
      
      this.departamentosDDL = data.data.map((item:any) =>( 
        {
        value: item.depa_Id,
        label: item.depa_Nombre
      })) 
    })
     
     this.firstFormGroup = this._formBuilder.group({
       flet_Inicio: ['', Validators.required],
       flet_Fin: ['', Validators.required],
       depa_Id: ['', Validators.required]
     });
 
   }
   
    firstFormGroup: FormGroup; // primer formulario
  
    ChartOptions: ChartOptions = {
      series: [
        {
            name: "Conteo",
            data: this.conteo
        }
    ],
    colors: [this.getRandomColor()],
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
    dataLabels: {
        enabled: false
    },
    xaxis: {
        categories: this.categorias
    }
    }
    splineArea1: ChartOptions = {
      series: [
          {
              name: "series1",
              data: [31,1]
          },
          {
              name: "series2",
              data: [11,1]
          }
      ],
      colors: [this.getRandomColor(),this.getRandomColor()],
      chart: {
          height: 350,
          type: "area",
          toolbar: {
              show: false
          }
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: "smooth"
      },
      xaxis: {
          type: "datetime",
          categories: [
              "2022-09-19T00:00:00.000Z",
              "2022-09-19T06:30:00.000Z"
          ]
      },
      tooltip: {
          x: {
              format: "dd/MM/yy HH:mm"
          }
      }
  };
    algo()
    {
      console.log(this.depa)
    }
    Filtrar()
    {      
        this.categorias = []
        this.conteo = []
        try
        {
          if(this.graficaEnvio.flet_Inicio == null || this.graficaEnvio.flet_Inicio == "")
          {
            this.graficaEnvio.flet_Inicio = null
          }
          else
          {
            this.graficaEnvio.flet_Inicio = this.graficaEnvio.flet_Inicio["year"] + "-" + this.graficaEnvio.flet_Inicio["month"] + "-" + this.graficaEnvio.flet_Inicio["day"]
          }
        }
        catch
        {
          this.graficaEnvio.flet_Inicio = null
        }
        try
        {
          if(this.graficaEnvio.flet_Fin == null || this.graficaEnvio.flet_Fin == "")
          {
            this.graficaEnvio.flet_Fin = null
          }
          else
          {
            this.graficaEnvio.flet_Fin = this.graficaEnvio.flet_Fin["year"] + "-" + this.graficaEnvio.flet_Fin["month"] + "-" + this.graficaEnvio.flet_Fin["day"]
          }
          
        }
        catch
        {
          this.graficaEnvio.flet_Fin = null
        }
        if(this.depa != null || this.depa != "")
        {
          this.graficaEnvio.depa_Id = this.depa 
        }
        this.service.getGrafica(this.graficaEnvio)
        .subscribe((data: any) => {
          console.log(data)
          if(data == null || data == "")
          {
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              title: 'No hay datos de esa fecha/departamento',
              icon: 'warning'
            })
            this.graficaEnvio.flet_Inicio = null
            this.graficaEnvio.flet_Fin = null
            this.graficaEnvio.depa_Id = null

          }else
          {
               
          data.forEach(element => {
            this.categorias.push(element.tray_DepaDescripcion)
            this.conteo.push(element.tray_Conteo)
            this.colores.push(this.getRandomColor())
          });
          this.ChartOptions = {
            series: [
              {
                  name: "Conteo",
                  data: this.conteo
              }
            ],
            colors: [this.getRandomColor()],
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
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: this.categorias
            }
          }  
          
      }
    })
  }
      getRandomColor(): any {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
}