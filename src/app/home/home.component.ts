import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  total = 0;
  checked = 0;

  constructor(private productService: ProductService, public appState: AppStateService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.total = products.length;
      this.checked = products.filter(p => p.checked).length;
      this.appState.setProductState({ totalProducts: this.total, totalChecked: this.checked });
    });
  }
}
