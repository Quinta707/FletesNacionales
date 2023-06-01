import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { NavService } from "src/app/shared/services/nav.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  usuario: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.submitted = false;
  }

  onLoggedin(e: MouseEvent) {
    e.preventDefault();
    const apiUrl = 'https://localhost:44339/api/Usuarios/Login';

    if (!this.usuario || !this.password) {
      this.submitted = true;
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
      }).fire({
        title: '¡ERROR!, Los campos de contraseña y usuario están vacíos',
        icon: 'error'
      });
      return;
    }

    const requestBody = {
      user_NombreUsuario: this.usuario,
      user_Contrasena: this.password,
    };

    this.http.post(apiUrl, requestBody).subscribe(
      (response: any) => {
        console.log(response);
        if (response.data && response.data.user_NombreUsuario) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('IdUsuario', response.data.user_Id);
          localStorage.setItem('Usuario', response.data.user_NombreUsuario);
          localStorage.setItem('empe_Id', response.data.empe_Id);
          localStorage.setItem('user_EsAdmin', response.data.user_EsAdmin);
          localStorage.setItem('empe_NombreCompleto', response.data.empe_NombreCompleto);
          localStorage.setItem('role_Id', response.data.role_Id);
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate(["/dashboard/default"]);
          }
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡Inicio de sesión exitoso!\nBienvenido(a) ' + JSON.parse(localStorage.getItem("user")).user_NombreUsuario,
            icon: 'success'
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            title: '¡ERROR!, Usuario o contraseña incorrectos',
            icon: 'error'
          });
        }
      },
      (error: any) => {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
        }).fire({
          title: '¡ERROR!, Usuario o contraseña incorrectos',
          icon: 'error'
        });
        console.error(error);
      }
    );
  }
}