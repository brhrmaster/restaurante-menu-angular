import { Component, inject, Input, LOCALE_ID, DEFAULT_CURRENCY_CODE, Output, EventEmitter } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/models.component';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-modal',
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
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  activeModal = inject(NgbActiveModal);

	@Input() selectedProduct: Product = new Product();
  @Output() onProductConfirmed = new EventEmitter<Product>();

  incluirProduto(modal: NgbActiveModal): void {
    console.log('produto adicionado!');
    modal.close('Ok click');
    this.onProductConfirmed.emit(this.selectedProduct);
  }
}
