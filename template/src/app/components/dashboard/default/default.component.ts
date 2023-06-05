import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TableService } from '../../../shared/services/municipios.services';
import { Grafica } from '../../../shared/model/grafica.model';
import * as data from "../../../shared/data/dashboard/default";
import * as chartData from '../../../shared/data/chart/google-chart';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  public validate = false;

  constructor(public calendar: NgbCalendar,private _formBuilder: FormBuilder, public service: TableService) {}
  
  getToday(): NgbDateStruct {
    const today = this.calendar.getToday();
    return { year: today.year, month: today.month, day: today.day };
  }
  
  categorias : any[] = []
  conteo : any[] = []
  graficaEnvio : Grafica = new Grafica()

  public departamentosDDL: [];
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
  public purchase = data.purchase
  public salesReturn = data.salesReturn
  public sales = data.sales
  public purchaseRate = data.purchaseRate

  owlcarousel1 = [
    { id: 1, img: "assets/images/slider/camion.jpg"},
    { id: 2, img: "assets/images/slider/vans.jpg" },
    { id: 3, img: "assets/images/slider/hk11.jpg" },
    { id: 4, img: "assets/images/slider/van1.jpg" },
    { id: 5, img: "assets/images/slider/hk2.jpg" },
    { id: 6, img: "assets/images/slider/ultimoultimo.jpg" }
  ];

  firstFormGroup: FormGroup; // primer formulario
  
  owlcarousel13Options = {
    items: 3,
    loop: true,
    lazyLoad: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1,
        mergeFit: true
      },
      768: {
        items: 2,
        mergeFit: true
      },
      992: {
        items: 3,
        mergeFit: true

      }
    }
  }

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
  dataLabels: {
      enabled: false
  },
  xaxis: {
      categories: this.categorias
  }
  }
  Filtrar()
  {      
      this.categorias = []
      this.conteo = []
      this.service.getGrafica(this.graficaEnvio)
      .subscribe((data: any) => {
        console.log(data)
        data.forEach(element => {
          console.log("hola")
          console.log(element.tray_DepaDescripcion)
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
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: this.categorias
        }
        }
      })
    }
  }

  



type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  stroke?: ApexStroke;
  tooltip?: any;
  dataLabels?: ApexDataLabels;
  yaxis?: ApexYAxis;
  legend?: ApexLegend;
  labels?: string[];
  plotOptions?: ApexPlotOptions;
  fill?: ApexFill;
  responsive?: ApexResponsive[];
  pieseries?: ApexNonAxisChartSeries;
  title?: ApexTitleSubtitle;
  theme?: ApexTheme;
  colors?: string[];
  markers?: ApexMarkers;
  annotations?: ApexAnnotations;
  grid?: ApexGrid;
}