import { Component, OnInit } from '@angular/core';
import { product } from '../data-types';
import { ProductsService } from '../services/products.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('0.3s ease-out')]),
      transition(':leave', animate('0.3s ease-in', style({ opacity: 0 }))),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  trendyProducts: undefined | product[];
  public products: any;
  public filteredProducts: any[] = [];
  selectedCategory: string | null = null;
  productCategoriesList: any;

  categories: any[] = [];
  constructor(private product: ProductsService) {}

  ngOnInit(): void {
    this.product.productList().subscribe((data) => {
      this.products = data;
      console.log('this.products', this.products);
      this.categories = this.extractCategories(this.products);
      this.filteredProducts = this.products;
      console.log('this.this.categories', this.categories);
    });

    this.product.getAllProductCategories().subscribe((data) => {
      this.productCategoriesList = data;
      console.log('productCategoriesList', this.productCategoriesList);
    });
  }

  extractCategories(products: any[]): any[] {
    const categories = new Set();
    products.forEach((product) => categories.add(product.category.name));
    return Array.from(categories).map((name) => ({ name, image: '' }));
  }

  selectCategory(categoryName: string | null): void {
    if (categoryName) {
      const filterString = categoryName.toLowerCase(); // Convert to lowercase for case-insensitive matching
      this.filteredProducts = this.products.filter((product: any) => {
        if (Array.isArray(product.category.name)) {
          return product.category.name.some((category: string) =>
            category.toLowerCase().includes(filterString)
          );
        }
        return false; // No match found
      });
    } else {
      this.filteredProducts = this.products;
    }
    console.log('Filtered products:', this.filteredProducts);
  }
  
  

  filterProducts() {
    if (this.selectedCategory === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product: { category: string | null }) =>
          product.category === this.selectedCategory
      );
    }
  }
}
