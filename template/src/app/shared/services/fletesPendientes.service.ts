/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/NgbdSortableHeader';
import { Flete } from '../model/fletes.model';
import { Municipios } from '../model/municipios.model';
import { Empleados } from '../model/empleados.model';
import { Vehiculos } from '../model/vehiculos.model';
import { Pedidos } from '../model/pedidos.model';
import { Trayectos } from '../model/trayectos.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
    tablePendienteItem: any[];
    totalpendiente: number;
}

interface State {
    pagepediente: number;
    pagepedienteSize: number;
    searchpendienteTerm: string;
    sortColumnPendiente: SortColumn;
    sortDirectionPendiente: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tablePendienteItem: Flete[], column: SortColumn, direction: string): Flete[] {
    if (direction === '' || column === '') {
        return tablePendienteItem;
    } else {
        return [...tablePendienteItem].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}
function matches(table: Flete, term: string, pipe: PipeTransform) {
    return table.empe_NombreCompleto.toLowerCase().includes(term.toLowerCase());
  }

@Injectable({ providedIn: 'root' })
export class TableService {
    private _loadingpendiente$ = new BehaviorSubject<boolean>(true);
    private _searchpendiente$ = new Subject<void>();
    private _tablePendienteItem$ = new BehaviorSubject<any[]>([]);
    private _totalpendiente$ = new BehaviorSubject<number>(0);

    fletePendientesData;

    private _statependiente: State = {
        pagepediente: 1,
        pagepedienteSize: 10,
        searchpendienteTerm: '',
        sortColumnPendiente: '',
        sortDirectionPendiente: ''
    };

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
        this._searchpendiente$.pipe(
          tap(() => this._loadingpendiente$.next(true)),
          debounceTime(200),
          switchMap(() => this._searchpendiente()),
          delay(200),
          tap(() => this._loadingpendiente$.next(false))
        ).subscribe(result => {
          this._tablePendienteItem$.next(result.tablePendienteItem);
          this._totalpendiente$.next(result.totalpendiente);
        });
      
        this._searchpendiente$.next();
      }
      

    get tablePendienteItem$() { return this._tablePendienteItem$.asObservable(); }
    get totalpendiente$() { return this._totalpendiente$.asObservable(); }
    get loadingpendiente$() { return this._loadingpendiente$.asObservable(); }
    get pagepediente() { return this._statependiente.pagepediente; }
    get pagepedienteSize() { return this._statependiente.pagepedienteSize; }
    get searchpendienteTerm() { return this._statependiente.searchpendienteTerm; }

    set pagepediente(pagepediente: number) {
        this._set({ pagepediente });
    }
    set pagepedienteSize(pagepedienteSize: number) { this._set({ pagepedienteSize }); }
    set searchpendienteTerm(searchpendienteTerm: string) { this._set({ searchpendienteTerm }); }
    set sortColumnPendiente(sortColumnPendiente: SortColumn) { this._set({ sortColumnPendiente }); }
    set sortDirectionPendiente(sortDirectionPendiente: SortDirection) { this._set({ sortDirectionPendiente }); }

    setfletePendientesData(val: object) {
        this.fletePendientesData = val;
    }

    deleteSingleData(name: string) {
        const tablePendienteItem = this.fletePendientesData;  
        const totalpendiente = tablePendienteItem.length;
        
        tablePendienteItem.map(item => {
                if(name === item.name){
                    this.fletePendientesData.splice(name,1);
                }
            })

        return (
            this._tablePendienteItem$.next(tablePendienteItem),
            this._totalpendiente$.next(totalpendiente)
        )

    }


    private _set(patch: Partial<State>) {
        Object.assign(this._statependiente, patch);
        this._searchpendiente$.next();
    }

    private _searchpendiente(): Observable<SearchResult> {
        const { sortColumnPendiente, sortDirectionPendiente, pagepedienteSize, pagepediente, searchpendienteTerm } =
          this._statependiente;
        console.log(this.fletePendientesData);
        // 1. sort
        let tablePendienteItem = sort(this.fletePendientesData, sortColumnPendiente, sortDirectionPendiente);
        console.log(tablePendienteItem)
        // 2. filter
        const totalpendiente = tablePendienteItem.length;
        tablePendienteItem = tablePendienteItem.filter((country) =>
          matches(country, searchpendienteTerm, this.pipe)
        );
    
        // 3. Parsear la fecha
        // tablePendienteItem.forEach((item) => {
        //     if (typeof item.flet_FechaDeSalida === 'string') {
        //       item.flet_FechaDeSalidaParseada = new Date(item.flet_FechaDeSalida);
        //       item.flet_FechaDeSalida = item.flet_FechaDeSalidaParseada.toLocaleDateString('es-ES', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //       });
        //     }
        //   });
          
    
        tablePendienteItem = tablePendienteItem
          .map((item, i) => ({ id: i + 1, ...item }))
          .slice((pagepediente - 1) * pagepedienteSize, (pagepediente - 1) * pagepedienteSize + pagepedienteSize);
        return of({ tablePendienteItem, totalpendiente });
      }
    
  FletesListado = Global + "Fletes/Listado";

  getFletes(){
    return this.http.get<Flete[]>(this.FletesListado);
  }
  
  getFletesPendientes(){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoPendientes");
  }

  getFletesEnProceso(){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoEnProceso");
  }

  getFletesTerminados(){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoTerminados");
  }
  
  getBuscarFlete(id){
    return this.http.get<Flete>(Global + "Fletes/Buscar?id=" + id);
  }
  
  
  getBuscarDetalles(id){
    return this.http.get<Pedidos>(Global + "Fletes/FleteDetalles?flet_Id=" + id);
  }

  getDllMunicipios(){
    return this.http.get<Municipios[]>(Global+"Municipios/Listado")
  }

  getDllEmpleados(){
    return this.http.get<Empleados[]>(Global+"Empleados/Listado")
  }

  getDllVehiculos(){
    return this.http.get<Vehiculos[]>(Global+"Vehiculos/Listado")
  }
  
  getPedidos(){
    return this.http.get<Pedidos[]>(Global+"Pedidos/Listado")
  }
  
  getPedidosPorMunicipio(id: string){
    return this.http.get<Pedidos[]>(Global+"Pedidos/PedidoPorMunicipio?muni="+id.toString())
  }
  
  getTrayectoId(desde: string, hasta: string){
    return this.http.get<Trayectos[]>(Global+"Trayectos/Existe?desde="+desde.toString()+"&hasta="+hasta.toString())
  }
  
  
  postTrayectoCreate(data: Trayectos){
    return this.http.post<any>(Global+"Trayectos/Insertar",data)
  }

  postInsertarFlete(data: any){
    return this.http.post<any>(Global+"Fletes/Insertar",data)
  }
  
  postInsertarFleteDetalles(data: any){
    return this.http.post<any>(Global+"Fletes/InsertarDetalles",data)
  }
  
  
  getVehiculoDisponible(vehi_id: number, fechaSalida: string){
    return this.http.get<any>(Global+`Fletes/VehiculoDisponible?vehi_Id=${vehi_id.toString()}&fechaSalida=${fechaSalida}`)
  }


  obtenerCoordenadas(municipio: String){

    const cityName = `${municipio}, Honduras`;
    const apiKey = '0ae2030d9b334e63ad7b7d75735626d9'; 

    return this.http.get<any>(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`)

  //   fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       const result = data.results[0];

  //       let homeCoords = {
  //         lat: result.geometry.lat,
  //         lon: result.geometry.lng
  //       };

  //       return homeCoords;

  //     })
      
  //     return 0;
   }

}

