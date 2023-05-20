import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountToModule } from 'angular-count-to';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SupportTicketRoutingModule } from './support-ticket-routing.module';
import { SupportTicketComponent } from './support-ticket.component';

@NgModule({
  declarations: [SupportTicketComponent],
  imports: [
    CommonModule,
    SupportTicketRoutingModule,
    CountToModule,
    FormsModule,
    SharedModule,
    NgbModule
  ]
})
export class SupportTicketModule { }
