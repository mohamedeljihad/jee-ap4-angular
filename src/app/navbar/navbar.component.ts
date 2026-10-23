import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions = [
    { title: 'Home', route: '/admin/home', icon: 'house' },
    { title: 'Products', route: '/admin/products', icon: 'search' },
    { title: 'New Product', route: '/admin/newProduct', icon: 'plus-circle', role: 'ADMIN' }
  ];

  constructor(public appState: AppStateService, private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
