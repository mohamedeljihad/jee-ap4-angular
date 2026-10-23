import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

export interface ProductsState {
  keyword: string;
  products: Product[];
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  totalChecked: number;
  status: '' | 'LOADING' | 'LOADED' | 'ERROR';
  errorMessage: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | undefined;
  roles: string[];
  token: string | undefined;
}

/** État global de l'application, partagé entre les composants. */
@Injectable({ providedIn: 'root' })
export class AppStateService {
  public productsState: ProductsState = {
    keyword: '', products: [], pageSize: 4, currentPage: 1, totalPages: 0,
    totalProducts: 0, totalChecked: 0, status: '', errorMessage: ''
  };

  public authState: AuthState = { isAuthenticated: false, username: undefined, roles: [], token: undefined };

  setProductState(state: Partial<ProductsState>): void {
    this.productsState = { ...this.productsState, ...state };
  }

  setAuthState(state: Partial<AuthState>): void {
    this.authState = { ...this.authState, ...state };
  }

  hasRole(role: string): boolean {
    return this.authState.roles.includes(role);
  }
}
