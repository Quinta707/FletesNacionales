import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  format = { add: 'Añadir', remove: 'remover', all: 'Todo', none: 'Ninguno',
  direction: 'left-to-right', draggable: true, locale: 'Indefinido' };
  confirmed = [];
  source = [   { item_id: 1, item_text: 'Mumbai' },
  { item_id: 2, item_text: 'Bangaluru' },
  { item_id: 3, item_text: 'Pune' },
  { item_id: 4, item_text: 'Navsari' },
  { item_id: 5, item_text: 'New Delhi' }
]

anadir(){
  console.log(this.confirmed)
}

}