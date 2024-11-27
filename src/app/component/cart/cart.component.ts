import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsComponent } from '../alerts/alerts.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  orderForm: FormGroup;
  orderConfirmed: boolean = false;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.orderForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userId: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  submitOrder(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Order placed:', orderData);
      this.orderConfirmed = true;
      this.alert("<Your>Success! Your order has been placed successfully!");
      this.cart = [];
      localStorage.removeItem('cart');
    } else {
      console.log('Form is invalid');
    }
  }

  alert(message: string): void {
    this.dialog.open(AlertsComponent, {
      data: { message },
      width: '500px',
    });
  }

  get cardNumber() {
    return this.orderForm.get('cardNumber');
  }

  get password() {
    return this.orderForm.get('password');
  }

  get userId() {
    return this.orderForm.get('userId');
  }
}
