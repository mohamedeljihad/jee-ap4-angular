import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

/** Vérifie que l'utilisateur possède le rôle déclaré dans data.requiredRole de la route. */
export const authorizationGuard: CanActivateFn = (route) => {
  const appState = inject(AppStateService);
  return appState.hasRole(route.data['requiredRole'])
    ? true
    : inject(Router).createUrlTree(['/admin/notAuthorized']);
};
