import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  public iconSidebar;
  user:any = JSON.parse(localStorage.getItem("user"))
  menuItems: Menu[] = [];
  menugral: Menu[] = [];
  menuflet: Menu[] = [];
  menuequi: Menu[] = [];
  menuacce: Menu[] = [];
  public url: any;
  public fileurl: any;
  public margin: any = 0;
  public width: any = window.innerWidth;
  public leftArrowNone: boolean = true;
  public rightArrowNone: boolean = false;

  constructor(private router: Router, private navServices: NavService,
    public layout: LayoutService) {
      
  }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedin')) {
      this.navServices.getMenuItems(parseInt(this.user.role_Id,0), this.user.user_EsAdmin).subscribe(
        (menuResponse:any) => {
          menuResponse.forEach(
            item => {
            
              if(item.pant_Menu === "gral"){
                console.log(item)
                const menutemporal = new Menu();
                menutemporal.title = item.pant_Nombre;
                menutemporal.path = item.pant_Url;
                menutemporal.icon = item.pant_Icono;
                menutemporal.type = "link";
                this.menugral.push(menutemporal);
              }
              if(item.pant_Menu === "flet"){
                const menutemporal = new Menu();
                menutemporal.title = item.pant_Nombre;
                menutemporal.path = item.pant_Url;
                menutemporal.icon = item.pant_Icono;
                menutemporal.type = "link";
                this.menuflet.push(menutemporal);
              }
              if(item.pant_Menu === "equi"){
                const menutemporal = new Menu();
                menutemporal.title = item.pant_Nombre;
                menutemporal.path = item.pant_Url;
                menutemporal.icon = item.pant_Icono;
                menutemporal.type = "link";
                this.menuequi.push(menutemporal);
              }
              if(item.pant_Menu === "acce"){
                const menutemporal = new Menu();
                menutemporal.title = item.pant_Nombre;
                menutemporal.path = item.pant_Url;
                menutemporal.icon = item.pant_Icono;
                menutemporal.type = "link";
                this.menuacce.push(menutemporal);
              }
            }
          )
          if(this.menugral.length > 0){
            const menuTitulo = new Menu();
            menuTitulo.headTitle1 = "General";
            this.menuItems.push(menuTitulo);
            this.menugral.forEach(item => {
              this.menuItems.push(item);
            })
           }
           if(this.menuflet.length > 0){
            const menuTitulo = new Menu();
            menuTitulo.headTitle1 = "Fletes";
            this.menuItems.push(menuTitulo);
            this.menuflet.forEach(item => {
              this.menuItems.push(item);
            })
           }
           if(this.menuequi.length > 0){
            const menuTitulo = new Menu();
            menuTitulo.headTitle1 = "Equipo";
            this.menuItems.push(menuTitulo);
            this.menuequi.forEach(item => {
              this.menuItems.push(item);
            })
           }
           if(this.menuacce.length > 0){
            const menuTitulo = new Menu();
            menuTitulo.headTitle1 = "Acceso";
            this.menuItems.push(menuTitulo);
            this.menuacce.forEach(item => {
              this.menuItems.push(item);
            })
           }
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
    console.log(this.menugral.length)
   
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth - 500;
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }


  // For Horizontal Menu
  scrollToLeft() {
    if (this.margin >= -this.width) {
      this.margin = 0;
      this.leftArrowNone = true;
      this.rightArrowNone = false;
    } else {
      this.margin += this.width;
      this.rightArrowNone = false;
    }
  }

  scrollToRight() {
    if (this.margin <= -3051) {
      this.margin = -3464;
      this.leftArrowNone = false;
      this.rightArrowNone = true;
    } else {
      this.margin += -this.width;
      this.leftArrowNone = false;
    }
  }


}
