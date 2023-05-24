import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejemplo';
  
  constructor  (private router:Router){}

  Listar() {
    this.router.navigate(['index'])
  }
  Agregar() {
    this.router.navigate(['create'])
  }
}

