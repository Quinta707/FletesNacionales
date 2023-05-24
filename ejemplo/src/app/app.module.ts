import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './CLientes/list/list.component';
import { CreateComponent } from './CLientes/create/create.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule } from '@angular/forms';

import { EditarComponent } from './CLientes/editar/editar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DataTablesModule } from "angular-datatables";
import { MyComponent } from './DataTable/list/list.component';

import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditarComponent,
    MyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    DataTablesModule,
    CommonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
