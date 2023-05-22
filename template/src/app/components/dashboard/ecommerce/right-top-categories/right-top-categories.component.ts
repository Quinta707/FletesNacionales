import { Component } from "@angular/core";

@Component({
  selector: "app-right-top-categories",
  templateUrl: "./right-top-categories.component.html",
  styleUrls: ["./right-top-categories.component.scss"],
})
export class RightTopCategoriesComponent {
  constructor() {}

  public categories = [
    {
      image: "assets/images/dashboard-2/category/1.png",
      name: "Food & Drinks",
      items: "12,200",
    },
    {
      image: "assets/images/dashboard-2/category/2.png",
      name: "Furniture",
      items: "7,510",
    },
    {
      image: "assets/images/dashboard-2/category/3.png",
      name: "Grocery",
      items: "15,475",
    },
    {
      image: "assets/images/dashboard-2/category/4.png",
      name: "Electronics",
      items: "27,840",
    },
    {
      image: "assets/images/dashboard-2/category/5.png",
      name: "Toys & Games",
      items: "8,788",
    },
    {
      image: "assets/images/dashboard-2/category/6.png",
      name: "Desktop",
      items: "10,673",
    },
    {
      image: "assets/images/dashboard-2/category/7.png",
      name: "Food & Drinks",
      items: "12,200",
    },
  ];

  recentActivity = [
    {
      date: "8th March, 2022 ",
      color: "primary",
      title: "Added Bew Items",
      dace: "Quisque a consequat ante sit amet magna...",
      images: [
        {
          img: "assets/images/dashboard-2/product/1.png"
        },
        {
          img: "assets/images/dashboard-2/product/2.png"
        },
        {
          img: "assets/images/dashboard-2/product/3.png"
        }
      ]
    },
    {
      date: "2nd Sep, Today",
      color: "warning",
      title: "Anamika Comments this Poducts",
      dace: "Quisque a consequat ante sit amet magna...",
      images: []
    },
    {
      date: "3nd Sep, 2022",
      color: "secondary",
      title: "AdJacksion Purchase ",
      dace: "Quisque a consequat ante sit amet magna...",
      images: []
    },
    {
      date: "2nd Sep, Today",
      color: "success",
      title: "Anamika Comments this Poducts",
      dace: "Quisque a consequat ante sit amet magna...",
      images: []
    },

  ]
}
