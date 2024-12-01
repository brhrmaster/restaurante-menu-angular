import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../models/models.component';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  activeModal = inject(NgbActiveModal);
	@Input() selectedProduct: Product;

  constructor() {
    this.selectedProduct = new Product();
  }
}
