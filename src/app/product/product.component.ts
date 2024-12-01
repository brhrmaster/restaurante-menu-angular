import { Component, OnInit, inject, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { ProductService } from '../services/product-service/product.service';
import { Category, Product } from '../models/models.component';
import { ModalComponent } from '../modal/modal.component';
import localePt from '@angular/common/locales/pt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localePt, 'pt');



@Component({
  standalone: true,
  selector: 'app-product',
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent
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
  private modalService = inject(NgbModal);

  constructor(private productService: ProductService) {
    this.currentCategory = '1';
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
    //const modalRef = this.modalService.open(ModalComponent);
		//modalRef.componentInstance.selectedProduct = product;
  }
}
