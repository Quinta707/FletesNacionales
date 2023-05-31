import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TableService } from '../../../shared/services/municipios.services';
import * as data from "../../../shared/data/dashboard/default";
import * as chartData from '../../../shared/data/chart/google-chart';

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  public validate = false;
  constructor(calendar: NgbCalendar, public service: TableService) {}
  
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
          data: [1,2,3,4,5,6,7,8,9,10]
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
      categories: [
          "India",
          "Canada",
          "UK",
          "Korea",
          "Italy",
          "France",
          "Japan",
          "US",
          "China",
          "Germany"
      ]
  }
  }

  graficaEnvio : Model = new Model()

   enviar()
   {

   }

  
}

class Model {
  flet_Inicio !: String;
  flet_Fin !: String;
  depa_Id !: number	;
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