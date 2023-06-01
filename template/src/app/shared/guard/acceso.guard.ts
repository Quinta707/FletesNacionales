import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { TableService } from '../../shared/services/usuarios.service';
import { RolesService } from '../../shared/services/rol.service';
import { RolesporPantalla } from "../model/rolesPorPantalla.model";
@Injectable({
  providedIn: "root",
})
export class AccesoGuard implements CanActivate {
  constructor(public router: Router,
              public service: TableService,
              private rolService: RolesService, 
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    console.log("entra Acceso")
    let user = JSON.parse(localStorage.getItem("user"));
    let parametro = next.params["parametro"]; // Obtener el valor del parámetro desde ActivatedRouteSnapshot
    if(!JSON.parse(localStorage.getItem("user") || '').user_EsAdmin){
      const ropaAcceso = new RolesporPantalla();
      ropaAcceso.role_Id = user.role_Id;
      ropaAcceso.pant_Nombre = parametro;
      this.rolService.validarRolTienePantalla(ropaAcceso)
      .subscribe((data:any) => {
          if(data.code === 200){
              if(data.data.codeStatus === 0){
                  this.router.navigate(["/dashboard/default"]);
                  return true
              }else{
                return false
              }
          }
      })
    }
    return true;


  }
}
