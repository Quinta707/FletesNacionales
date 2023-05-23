import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {

  constructor() { }

  files: File[] = [];
  files1: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.replaceFile();
    }
  }
  
  replaceFile() {
    this.files.splice(0,1);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelect1(event) {
    this.files1.push(...event.addedFiles);
  }

  ngOnInit() {
  }

}
