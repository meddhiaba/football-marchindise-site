import { Component, Input } from '@angular/core';
import { Product } from '../../classes/product';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PRIXPipe } from "../../pipe/prix.pipe";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, PRIXPipe,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  {
  @Input() products: Product[] = [];
}
