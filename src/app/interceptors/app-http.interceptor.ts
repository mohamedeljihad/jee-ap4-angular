import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { AppStateService } from '../services/app-state.service';

/**
 * Intercepteur HTTP : ajoute le jeton d'authentification à chaque requête
 * et met à jour l'état "LOADING" (spinner dans la navbar).
 */
export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const appState = inject(AppStateService);
  appState.setProductState({ status: 'LOADING' });
  const token = appState.authState.token;
  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(request).pipe(finalize(() => appState.setProductState({ status: 'LOADED' })));
};
