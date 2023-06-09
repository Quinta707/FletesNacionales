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
    tableItem: any[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(tableItem: Flete[], column: SortColumn, direction: string): Flete[] {
    if (direction === '' || column === '') {
        return tableItem;
    } else {
        return [...tableItem].sort((a, b) => {
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
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _tableItem$ = new BehaviorSubject<any[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    userData;

    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private http: HttpClient) {
        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
        ).subscribe(result => {
          this._tableItem$.next(result.tableItem);
          this._total$.next(result.total);
        });
      
        this._search$.next();
      }
      

    get tableItem$() { return this._tableItem$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    setUserData(val: object) {
        this.userData = val;
    }

    deleteSingleData(name: string) {
        const tableItem = this.userData;  
        const total = tableItem.length;
        
        tableItem.map(item => {
                if(name === item.name){
                    this.userData.splice(name,1);
                }
            })

        return (
            this._tableItem$.next(tableItem),
            this._total$.next(total)
        )

    }


    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } =
          this._state;
    
        // 1. sort
        let tableItem = sort(this.userData, sortColumn, sortDirection);
    
        // 2. filter
        const total = tableItem.length;
        tableItem = tableItem.filter((country) =>
          matches(country, searchTerm, this.pipe)
        );
    
        // 3. Parsear la fecha
        // tableItem.forEach((item) => {
        //     if (typeof item.flet_FechaDeSalida === 'string') {
        //       item.flet_FechaDeSalidaParseada = new Date(item.flet_FechaDeSalida);
        //       item.flet_FechaDeSalida = item.flet_FechaDeSalidaParseada.toLocaleDateString('es-ES', {
        //         day: '2-digit',
        //         month: '2-digit',
        //         year: 'numeric'
        //       });
        //     }
        //   });
          
    
        tableItem = tableItem
          .map((item, i) => ({ id: i + 1, ...item }))
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ tableItem, total });
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

