import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId!: string;
  productForm?: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe(product => {
      this.productForm = this.fb.group({
        id: this.fb.control(product.id),
        name: this.fb.control(product.name, [Validators.required, Validators.minLength(3)]),
        price: this.fb.control(product.price, [Validators.required, Validators.min(100)]),
        checked: this.fb.control(product.checked)
      });
    });
  }

  updateProduct(): void {
    if (!this.productForm || this.productForm.invalid) return;
    this.productService.updateProduct(this.productForm.value).subscribe(() => this.router.navigateByUrl('/admin/products'));
  }
}
