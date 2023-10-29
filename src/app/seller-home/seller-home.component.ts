import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductsService } from '../services/products.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  productCategoriesList: any
  // icon = faTrash;
  // iconEdit=faEdit;

  constructor(private product: ProductsService) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });

    this.product.getAllProductCategories().subscribe((data) => {
      this.productCategoriesList = data;
      console.log("productCategoriesList", this.productCategoriesList)
    });
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
