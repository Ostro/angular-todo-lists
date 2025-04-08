import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { User as PrismaUser } from '../../types/prismaTypes';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

type User = Omit<PrismaUser, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  status = signal<'loading' | 'loaded'>('loading');

  constructor() {
    if (this.platformId === 'browser') {
      const jwt = localStorage?.getItem('userSession');
      if (jwt) {
        this.currentUser.set(jwtDecode(jwt));
      }
      this.status.set('loaded');
    }
  }

  login(email: string, password: string, onSuccess?: () => void) {
    this.http
      .post<{ jwt: string }>('http://localhost:3000/login', {
        email,
        password,
      })
      .subscribe((data) => {
        localStorage?.setItem('userSession', data.jwt);
        this.currentUser.set(jwtDecode(data.jwt) as User);
        this.router.navigate(['/']);
        if (onSuccess && data.jwt) {
          onSuccess();
        }
      });
  }

  logout() {
    localStorage?.removeItem('userSession');
    this.currentUser.set(null);
  }
}
