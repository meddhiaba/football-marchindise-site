import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from "../product-list/product-list.component";
@Component({
  selector: 'app-product-container',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css'
})
export class ProductContainerComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = [...products];
    });
  }

  filterProducts(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const keyword = inputElement.value.trim().toLowerCase();
    if (!keyword) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      );
    }
  }

}


