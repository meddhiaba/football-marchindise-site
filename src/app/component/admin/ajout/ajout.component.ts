import { Router } from '@angular/router';
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Product } from '../../../classes/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-ajout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.css'
})
export class AjoutComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchControl: FormControl = new FormControl('');
  productForm: FormGroup;

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

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(() => this.loadProducts());
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value as Product;
      product.disponible = this.productForm.get('disponible')?.value ?? false;
      product.comments = [];
      this.addProduct(product);
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
