import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { CommonModule } from '@angular/common';
import { Product } from '../../../classes/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CurrencyPipe,DatePipe,CommonModule,ReactiveFormsModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl: FormControl = new FormControl('');

  constructor(private productService: ProductService,private router:Router) {
  }

  ngOnInit() {
    this.loadProducts();
    this.searchControl.valueChanges.subscribe((searchValue: any) =>
      this.filterProducts(searchValue || '')
    );
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
      this.filterProducts(this.searchControl.value || '');
    });
  }

  deleteComment(productId: string, comment: any) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      const index = product.comments.indexOf(comment);
      if (index !== -1) {
        product.comments.splice(index, 1);
        this.productService.updateProduct(productId, product).subscribe(() => this.loadProducts());
      }
    }
  }

  filterProducts(searchKeyword: string) {
    const keyword = searchKeyword.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
  }

}
