import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductsService
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.warn(query);
    query &&
      this.product.searchProduct(query).subscribe((result) => {
        this.searchResult = result;
      });
  }
}
