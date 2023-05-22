import { Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-quick-view",
  templateUrl: "./quick-view.component.html",
  styleUrls: ["./quick-view.component.scss"],
})
export class QuickViewComponent implements OnInit {
  public counter: number = 1;

  @Input() productDetail: any;

  constructor(private router: Router, private ngb: NgbModal) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngb.dismissAll();
      }
    });
  }

  ngOnInit(): void {}

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }
}
