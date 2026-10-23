import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      price: this.fb.control(0, [Validators.required, Validators.min(100)]),
      checked: this.fb.control(false)
    });
  }

  saveProduct(): void {
    if (this.productForm.invalid) return;
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: p => {
        this.message = `Produit "${p.name}" enregistré (id ${p.id})`;
        this.productForm.reset({ name: '', price: 0, checked: false });
      },
      error: err => (this.message = err.message)
    });
  }
}
