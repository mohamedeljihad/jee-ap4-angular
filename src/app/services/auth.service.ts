import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppStateService } from './app-state.service';

interface AppUser { id: string; username: string; password: string; roles: string[]; }

/**
 * Authentification de démonstration : les utilisateurs sont stockés dans json-server.
 * (Dans le projet final, l'authentification est déléguée à Spring Security + JWT.)
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private host = 'http://localhost:8089';

  constructor(private http: HttpClient, private appState: AppStateService) {}

  async login(username: string, password: string): Promise<boolean> {
    const users = await firstValueFrom(this.http.get<AppUser[]>(`${this.host}/users?username=${username}`));
    const user = users[0];
    if (!user || user.password !== password) throw new Error('Identifiant ou mot de passe incorrect');
    const token = btoa(JSON.stringify({ sub: user.username, roles: user.roles, iat: Date.now() }));
    this.appState.setAuthState({ isAuthenticated: true, username: user.username, roles: user.roles, token });
    return true;
  }

  logout(): void {
    this.appState.setAuthState({ isAuthenticated: false, username: undefined, roles: [], token: undefined });
  }
}
