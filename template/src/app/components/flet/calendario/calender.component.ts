import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { TableService } from '../../../shared/services/fletes.service';
import { map } from 'rxjs/operators';
import * as L from "leaflet";
import 'leaflet-routing-machine';

const colors: any = {
  red: {
    primary: '#4466f2',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderComponent {

  @ViewChild('modalContent',{static: false})

  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  ngOnInit() {

    this.service.getFletes().pipe(
      map((data:any) => {
        return data.data.map((item) => ({
          start: new Date(item.flet_FechaDeSalida),
          end: new Date(item.flet_FechaDeSalida),
          color: this.getRandomColor(),
          title: `Flete con salida desde: ${item.muni_NombreInicio} y destino hasta: ${item.muni_NombreFinal}`,actions: this.actions,
          allDay: true,
          cssClass: 'custom-event'
        }));
      })
    ).subscribe((mappedData) => {
      this.events = mappedData;
    });

  }
  actions: CalendarEventAction[] = [
    
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = true;

  getRandomColor(): any {
    const letters = '0123456789ABCDEF';
    let color = '#';
    let color2 = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      color2 += letters[Math.floor(Math.random() * 15)];
    }
    return { primary: color, secondary: '#FFF' };
  }

  constructor(private modal: NgbModal,
              private service: TableService) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   event.start = newStart;
  //   event.end = newEnd;
  //   this.handleEvent('Dropped or resized', event);
  // }
  
  private routingControl: any;

  waypoints = [
    // L.latLng(this.coordenadasIncio.lat, this.coordenadasIncio.lon), 
  ]

  async handleEvent(action: string, event: CalendarEvent) {
    let paso1: string = event.title.substring(24,event.title.length)
    let paso2: string[] = paso1.split(' y destino hasta: ')
    console.log(paso2) 

    const coordenadasMuniInicio: any = await this.service
        .obtenerCoordenadas(paso2[0])
        .toPromise();
      const result0 = coordenadasMuniInicio.results[0];
      let cords0 = {
        lat: result0.geometry.lat,
        lon: result0.geometry.lng,
      };
      let coordenadasIncio = cords0;

      const coordenadasMuniFin: any = await this.service
        .obtenerCoordenadas(paso2[1])
        .toPromise();
      const result1 = coordenadasMuniFin.results[0];
      let cords1 = {
        lat: result1.geometry.lat,
        lon: result1.geometry.lng,
      };
      let coordenadasFin = cords1;

      if(this.routingControl){
        this.routingControl.remove();
      }

      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(coordenadasIncio.lat, coordenadasIncio.lon),
          L.latLng(coordenadasFin.lat, coordenadasFin.lon)
        ],
        routeWhileDragging: false,
        fitSelectedRoutes: true,
        addWaypoints: false,
        collapsible: true,
      }).addTo(this.map4)
      this.scrollToFooter()
  }

  options4 = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "",
      }),
    ],
    zoom: 7,
    center: L.latLng(14.772433199139046, -86.63434162882122),
  };

  private map4: L.Map;

  scrollToFooter() {
    const footerElement = document.getElementById('mapita');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMapReady4(map: L.Map) {
    this.map4 = map;
  }

}
