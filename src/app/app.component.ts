import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from './product/product.component';
import { Product } from './models/models.component';
import { ProductCartComponent } from './product-cart/product-cart.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductComponent,
    FooterComponent,
    HomeComponent,
    CommonModule,
    ProductCartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  currentPage: string = 'cardapio';
  selectedProducts:Product[] = [];

  setPage(page: string) {
    this.currentPage = page;
  }

  onProductSelected(product: Product) {
    this.addToCart(product);
  }

  addToCart(product: Product) {
    // check if not exists
    if(!this.selectedProducts.some(_product => _product.id === product.id)) {
      this.selectedProducts.push({ ...product })
    } else {
      // add qtd
      this.selectedProducts.find(_product => _product.id === product.id)!.qtd++;
    }
  }
}
