export interface Product {
  id: number;
  img?: string;
  name: string;
  desc: string;
  amount: number;
  stock: string;
  date: string;
}

export const PRODUCT: Product[] = [
  {
    id: 1,
    img: "assets/images/ecommerce/product-table-1.png",
    name: "Men's Shirt",
    desc: "Vida Loca - Blue Denim Fit Men's Casual Shirt.",
    amount: 10,
    stock: "In Stock",
    date: "20/08/2022",
  },
  {
    id: 2,
    img: "assets/images/ecommerce/product-table-2.png",
    name: "Red Shirt",
    desc: "Wild West - Red Cotton Blend Regular Fit Men's Formal Shirt.",
    amount: 12,
    stock: "out of stock",
    date: "12/04/2022",
  },
  {
    id: 3,
    img: "assets/images/ecommerce/product-table-3.png",
    name: "Brown Dress",
    desc: "aask - Brown Polyester Blend Women's Fit & Flare Dress.",
    amount: 14,
    stock: "In Stock",
    date: "04/08/2022",
  },
  {
    id: 4,
    img: "assets/images/ecommerce/product-table-4.png",
    name: "Red Skirt",
    desc: "R L F - Red Cotton Blend Women's A-Line Skirt.",
    amount: 20,
    stock: "Low Stock",
    date: "25/04/2022",
  },
  {
    id: 5,
    img: "assets/images/ecommerce/product-table-5.png",
    name: "Jeans Jacket",
    desc: "The Dry State - Blue Denim Regular Fit Men's Denim Jacket.",
    amount: 22,
    stock: "In Stock",
    date: "29/06/2022",
  },
  {
    id: 6,
    img: "assets/images/ecommerce/product-table-6.png",
    name: "Flower Dress",
    desc: "Skyblue Flower Printed Sleevless Strappy Dress",
    amount: 10,
    stock: "out of stock",
    date: "15/05/2022",
  },
  {
    id: 7,
    img: "assets/images/ecommerce/product-table-1.png",
    name: "Men's Shirt",
    desc: "Vida Loca - Blue Denim Fit Men's Casual Shirt.",
    amount: 24,
    stock: "out of stock",
    date: "01/03/2022",
  },
  {
    id: 8,
    img: "assets/images/ecommerce/product-table-2.png",
    name: "Red Shirt",
    desc: "Wild West - Red Cotton Blend Regular Fit Men's Formal Shirt.",
    amount: 21,
    stock: "Low Stock",
    date: "11/11/2022",
  },
  {
    id: 9,
    img: "assets/images/ecommerce/product-table-3.png",
    name: "Brown Dress",
    desc: "aask - Brown Polyester Blend Women's Fit & Flare Dress.",
    amount: 19,
    stock: "In Stock",
    date: "18/12/2022",
  },
  {
    id: 10,
    img: "assets/images/ecommerce/product-table-4.png",
    name: "Red Skirt",
    desc: "R L F - Red Cotton Blend Women's A-Line Skirt.",
    amount: 30,
    stock: "In Stock",
    date: "14/04/2022",
  },
];
