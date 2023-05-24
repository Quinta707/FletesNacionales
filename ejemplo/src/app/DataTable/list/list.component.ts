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
  constructor(private service: ServiceService, private router: Router){}
  roles!: RolesporPantalla
  ngOnInit(): void {
    this.service.getRoles()
    .subscribe((data: any) => {
      this.roles = data.data
      console.log(this.roles)
    });
  }

  outerTableData = [
    { id: 1, name: 'John', age: 30, showTasks: false, tasks: [
      { id: 1, task: 'Task 1', status: 'Completed' },
      { id: 2, task: 'Task 2', status: 'In Progress' },
      { id: 3, task: 'Task 3', status: 'Pending' }
    ]},
    { id: 2, name: 'Jane', age: 25, showTasks: false, tasks: [
      { id: 4, task: 'Task 4', status: 'Completed' },
      { id: 5, task: 'Task 5', status: 'In Progress' },
      { id: 6, task: 'Task 6', status: 'Pending' }
    ]}
  ];
  toggleTasks(outerRow: any): void {
    // Cerrar todas las tareas abiertas excepto la seleccionada
    this.outerTableData.forEach((row: any) => {
      if (row !== outerRow) {
        row.showTasks = false;
      }
    });

    // Alternar la tarea seleccionada
    outerRow.showTasks = !outerRow.showTasks;

    // Si se abre la tarea, esperar a que termine la animación y desplazarse hasta ella
    if (outerRow.showTasks) {
      setTimeout(() => {
        const element = document.getElementById('outer-row-' + outerRow.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Ajusta el tiempo según sea necesario para que coincida con la duración de la animación CSS
    }
  }
}
