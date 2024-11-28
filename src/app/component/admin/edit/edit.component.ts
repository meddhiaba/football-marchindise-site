import { Component } from '@angular/core';
import { Product } from '../../../classes/product';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CurrencyPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl: FormControl = new FormControl('');
  productForm: FormGroup;
  editingProductId: string | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder,private router:Router) {
    this.productForm = this.fb.group({
      name: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      price: new FormControl(0, { nonNullable: true }),
      imageUrl: new FormControl(''),
      disponible: new FormControl(false, { nonNullable: true }),
    });
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

  updateProduct(id: string, product: Product) {
    this.productService.updateProduct(id, product).subscribe(() => this.loadProducts());
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      product.disponible = this.productForm.get('disponible')?.value ?? false;
      product.comments = [];
      if (this.editingProductId) {
        this.updateProduct(this.editingProductId, product);
        this.editingProductId = null;
      }
      this.resetForm();
    }
  }



  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productForm.patchValue({
          imageUrl: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      disponible: false,
    });
    this.editingProductId = null;
  }

  filterProducts(searchKeyword: string) {
    const keyword = searchKeyword.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
  }

  editProduct(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.editingProductId = id;
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        disponible: product.disponible,
      });
    }
  }

}
