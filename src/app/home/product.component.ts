import { Component, OnInit, inject, Input, LOCALE_ID, DEFAULT_CURRENCY_CODE, Output, EventEmitter } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { ProductService } from '../services/product-service/product.service';
import { Category, Product } from '../models/models.component';
import localePt from '@angular/common/locales/pt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt, 'pt');


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
  imports: [
    CommonModule,
    FormsModule
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
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Incluir {{selectedProduct.name}}</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
      <div class="container">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid" src="{{selectedProduct.imageLink}}"/>
          </div>
          <div class="col-9">
            <div class="product-item-desc">{{selectedProduct.description}}</div>
            <ng-container *ngIf="selectedProduct.promo <= 0">
              <div class="product-item-price" style="margin-top: 20px; color: #0ab54e">{{selectedProduct.price | currency}}</div>
            </ng-container>
            <ng-container *ngIf="selectedProduct.promo > 0">
              <div class="product-item-price" style="margin-top: 20px;">Por apenas: <span style="color: #0ab54e">{{selectedProduct.promo | currency}} </span> <s>{{selectedProduct.price | currency}}</s></div>
            </ng-container>
          </div>
        </div>
      </div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancelar</button>
			<button type="button" class="btn btn-danger" (click)="incluirProduto(activeModal)">Ok</button>
		</div>
	`,
})
export class NgbdModalContent {
	activeModal = inject(NgbActiveModal);

	@Input() selectedProduct: Product = new Product();
  @Output() onProductConfirmed = new EventEmitter<Product>();

  incluirProduto(modal: NgbActiveModal): void {
    console.log('produto adicionado!');
    modal.close('Ok click');
    this.onProductConfirmed.emit(this.selectedProduct);
  }
}


@Component({
  standalone: true,
  selector: 'app-product',
  imports: [
    CommonModule,
    FormsModule
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
  currentCategory: string;
  selectCategory: FormControl = new FormControl('');
  selectedProduct: Product;
  private modalService = inject(NgbModal);

  @Output() selectedProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.currentCategory = '1';
    this.selectedProduct = new Product();
  }

  loadData(): void {
    this.productService.getData().subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.products = data.products.filter(product => product.categoryId == Number(this.currentCategory));
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
    this.selectedProduct = product;
    const modalRef = this.modalService.open(NgbdModalContent);
		modalRef.componentInstance.selectedProduct = product;
  }

  addToCart(product: Product) {
    this.selectedProducts.push(product);
  }
}

