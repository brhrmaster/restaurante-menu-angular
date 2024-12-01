import { Component, DEFAULT_CURRENCY_CODE, Input, LOCALE_ID } from '@angular/core';
import { Product } from '../models/models.component';
import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
      {
          provide: LOCALE_ID,
          useValue: 'pt'
      },
      {
          provide:  DEFAULT_CURRENCY_CODE,
          useValue: 'BRL'
      },
  ],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Input() selectedProducts!: Product[];

  getSubtotal(product: Product):number {
    const price = product.promo > 0 ? product.promo : product.price;
    return product.qtd * price;
  }

  getTotal(): number {
    return this.selectedProducts
      .map(product => this.getSubtotal(product))
      .reduce((prev: number, current: number) => {
        return prev + current;
      }, 0);
  }
}
