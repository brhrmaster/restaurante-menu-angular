import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  nome:string = 'Bruno Henry';
  ano:number = 2024;
  desc:string = 'Todos os direitos reservados'
}
