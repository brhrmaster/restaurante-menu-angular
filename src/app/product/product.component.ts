import { Component, OnInit, inject, LOCALE_ID, DEFAULT_CURRENCY_CODE, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { ProductService } from '../services/product-service/product.service';
import { Category, Product } from '../models/models.component';
import localePt from '@angular/common/locales/pt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

registerLocaleData(localePt, 'pt');

@Component({
  standalone: true,
  selector: 'app-product',
  imports: [
    CommonModule,
    FormsModule,
],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [
      {
          provide: LOCALE_ID,
          useValue: 'pt'
      },
      {
          provide:  DEFAULT_CURRENCY_CODE,
          useValue: 'BRL'
      },
  ]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  currentCategory: string = '1';
  selectCategory: FormControl = new FormControl('');
  private modalService = inject(NgbModal);

  @Output() onProductSelected = new EventEmitter<Product>();
  @Input() selectedProducts!: Product[];

  constructor(private productService: ProductService) {}

  loadData(): void {
    this.productService.getData().subscribe({
      next: (data) => {
        this.categories = data.categories;
        const _products = data.products.filter(product => product.categoryId == Number(this.currentCategory));

        // setup qtd
        _products.forEach(product => product.qtd = 1);

        this.products = _products;
      },
      error: (e) => console.error('Error fetching data:', e),
      complete: () => console.info('Products successfully loaded'),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  onCategorySelected(value:string): void {
    this.currentCategory = value;
    this.loadData();
  }

  toNumber(value: string): number {
    return Number(value);
  }

  prepareAddToCart(product: Product): void {
    const modalRef = this.modalService.open(ModalComponent);
		modalRef.componentInstance.selectedProduct = product;
		modalRef.componentInstance.onProductConfirmed.subscribe(($event: Product) => {
      this.addToCart($event);
    });
  }

  addToCart(product: Product) {
    this.onProductSelected.emit(product);
  }

  getSelectedQtd(product: Product):number {
    return this.selectedProducts.find(_product => _product.id === product.id)?.qtd || 0;
  }
}

