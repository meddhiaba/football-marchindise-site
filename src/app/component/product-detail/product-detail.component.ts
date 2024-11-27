import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from '../../classes/product';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PRIXPipe } from "../../pipe/prix.pipe";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, PRIXPipe,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading: boolean = true;
  commentForm: FormGroup;
  showPanierIcon: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.commentForm = this.fb.group({
      author: [''],
      message: [''],
    });
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.isLoading = false;
      },
    });
  }

  addComment() {
    if (this.commentForm.valid && this.product) {
      const newComment = {
        ...this.commentForm.value,
        date: new Date(),
      };

      this.product.comments.push(newComment);
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => this.commentForm.reset(),
        error: (err) => console.error('Error updating product:', err),
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const productIndex = cart.findIndex((item: Product) => item.id === this.product?.id);

      if (productIndex === -1) {
        // If product not in cart, add it with quantity 1
        cart.push({ ...this.product, quantity: 1 });
      } else {
        // If product already in cart, increase its quantity
        cart[productIndex].quantity += 1;
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      console.log('Product added to cart:', this.product);
    }
  }


  goToCart(): void {
    this.router.navigate(['/cart']);
  }


}
