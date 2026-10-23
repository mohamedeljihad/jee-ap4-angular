import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

/** Empêche l'accès aux pages de l'espace /admin sans authentification. */
export const authenticationGuard: CanActivateFn = () => {
  const appState = inject(AppStateService);
  return appState.authState.isAuthenticated ? true : inject(Router).createUrlTree(['/login']);
};
