import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbPaginationConfig], // add NgbPaginationConfig to the component providers
})
export class PaginationComponent implements OnInit {
  paginationSide = ["start", "center", "end"];
  pagination = ["primary", "secondary", "success", "info", "warning", "danger"];

  constructor(config: NgbPaginationConfig) {}

  ngOnInit() {}
}
