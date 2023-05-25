import { Component } from '@angular/core';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';
import { RolesporPantalla } from 'src/app/Model/Roles';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  esquemas = ['Esquema 1', 'Esquema 2', 'Esquema 3', 'Esquema 4'];
  pantallas = [
    ['Pantalla 1', 'Pantalla 2', 'Pantalla 3', 'Pantalla 4', 'Pantalla 5'],
    ['Pantalla 6', 'Pantalla 7', 'Pantalla 8', 'Pantalla 9', 'Pantalla 10'],
    ['Pantalla 11', 'Pantalla 12', 'Pantalla 13', 'Pantalla 14', 'Pantalla 15'],
    ['Pantalla 16', 'Pantalla 17', 'Pantalla 18', 'Pantalla 19', 'Pantalla 20']
  ];

  selectedEsquemas: string[] = [];
  selectedPantallas: string[] = [];

  togglePantalla(esquemaIndex: number, pantallaIndex: number) {
    const isSelected = this.isSelectedPantalla(esquemaIndex, pantallaIndex);
    const pantalla = this.pantallas[esquemaIndex][pantallaIndex];

    if (isSelected) {
      this.selectedPantallas = this.selectedPantallas.filter(p => p !== pantalla);
    } else {
      this.selectedPantallas.push(pantalla);
    }
  }

  isSelectedPantalla(esquemaIndex: number, pantallaIndex: number): boolean {
    const pantalla = this.pantallas[esquemaIndex][pantallaIndex];
    return this.selectedPantallas.includes(pantalla);
  }

  toggleEsquema(esquema: string, event: any) {
    
    if(event.target.checked == true)
    {
      console.log('se selecciono')
      
    }
    else{
      console.log('no se selecciono')
    }
    const isSelected = this.isSelectedEsquema(esquema);

    if (isSelected) {
      this.selectedEsquemas = this.selectedEsquemas.filter(e => e !== esquema);
      this.selectedPantallas = this.selectedPantallas.filter(p => !p.startsWith(esquema));
    } else {
      this.selectedEsquemas.push(esquema);
      this.selectedPantallas = this.selectedPantallas.concat(this.pantallas[this.esquemas.indexOf(esquema)]);
    }
  }

  isSelectedEsquema(esquema: string): boolean {
    return this.selectedEsquemas.includes(esquema);
  }

  deselectAll() {
    this.selectedEsquemas = [];
    this.selectedPantallas = [];
  }

  deselectPantallas(esquema: string) {
    this.selectedPantallas = this.selectedPantallas.filter(p => !p.startsWith(esquema));
  
}
}
