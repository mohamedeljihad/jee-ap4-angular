import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../services/product.service';
import { AppStateService } from '../services/app-state.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService, public appState: AppStateService, private router: Router) {}

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(): void {
    const s = this.appState.productsState;
    this.productService.searchProducts(s.keyword, s.currentPage, s.pageSize).subscribe({
      next: resp => {
        const products = resp.body as Product[];
        const totalProducts = parseInt(resp.headers.get('x-total-count') ?? '0', 10);
        let totalPages = Math.floor(totalProducts / s.pageSize);
        if (totalProducts % s.pageSize !== 0) totalPages++;
        this.appState.setProductState({ products, totalProducts, totalPages, status: 'LOADED' });
      },
      error: err => this.appState.setProductState({ status: 'ERROR', errorMessage: err.message })
    });
  }

  newSearch(): void {
    this.appState.setProductState({ currentPage: 1 });
    this.searchProducts();
  }

  handleCheckProduct(product: Product): void {
    this.productService.checkProduct(product).subscribe(() => (product.checked = !product.checked));
  }

  handleDelete(product: Product): void {
    if (!confirm(`Supprimer le produit "${product.name}" ?`)) return;
    this.productService.deleteProduct(product).subscribe(() => {
      // revenir à la page précédente si la page courante devient vide
      const s = this.appState.productsState;
      if (s.products.length === 1 && s.currentPage > 1) this.appState.setProductState({ currentPage: s.currentPage - 1 });
      this.searchProducts();
    });
  }

  handleEdit(product: Product): void {
    this.router.navigateByUrl(`/admin/editProduct/${product.id}`);
  }

  handleGotoPage(page: number): void {
    this.appState.setProductState({ currentPage: page });
    this.searchProducts();
  }

  pages(): number[] {
    return Array.from({ length: this.appState.productsState.totalPages }, (_, i) => i + 1);
  }
}
