/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { Flete } from '../model/fletes.model';
import { Municipios } from '../model/municipios.model';
import { Empleados } from '../model/empleados.model';
import { Vehiculos } from '../model/vehiculos.model';
import { Pedidos } from '../model/pedidos.model';
import { Trayectos } from '../model/trayectos.model';
import { Global } from '../../../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TableService {
 
    constructor(private http: HttpClient) {}
      

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
  
  getFletesPendientesEmpleado(id:number){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoEmpleadoPendientes?id="+id.toString());
  }

  getFletesEnProcesoEmpleado(id:number){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoEmpleadoEnProceso?id="+id.toString());
  }

  getFletesTerminadosEmpleado(id:number){
    return this.http.get<Flete[]>(Global + "Fletes/ListadoEmpleadoTerminado?id="+id.toString());
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


  getDllEstados(){
    return this.http.get<Municipios[]>(Global+"EstadosDelPedido/Listado")
  }

  getDllEmpleados(){
    return this.http.get<Empleados[]>(Global+"Empleados/ListadoConductores")
  }

  getDllVehiculos(){
    return this.http.get<Vehiculos[]>(Global+"Vehiculos/Listado")
  }
  
  getPedidos(){
    return this.http.get<Pedidos[]>(Global+"Pedidos/Listado")
  }

  postEmpezar(data: any){
    return this.http.post<any>(Global+"Fletes/Empezar",data)
  }

  postTerminar(data: any){
    return this.http.post<any>(Global+"Fletes/Terminar",data)
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
 
  putUpdateFlete(data: any){
    return this.http.put<any>(Global+"Fletes/Editar",data)
  }
 
  putUpdateEstadoPedido(data: any){
    return this.http.put<any>(Global+"Pedidos/EditarEstado",data)
  }
  
  postInsertarUbicacion(data: any){
    return this.http.post<any>(Global+"Fletes/InsertarUbicacion",data)
  }
  
  postInsertarFleteDetalles(data: any){
    return this.http.post<any>(Global+"Fletes/InsertarDetalles",data)
  }
  
  
  getVehiculoDisponible(vehi_id: number, fechaSalida: string){
    return this.http.get<any>(Global+`Fletes/VehiculoDisponible?vehi_Id=${vehi_id.toString()}&fechaSalida=${fechaSalida}`)
  }


  obtenerCoordenadas(municipio: String, departamento:String){

    const cityName = `${municipio}, ${departamento}, Honduras`;
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

