import {
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  REQUEST,
  signal,
} from '@angular/core';
import { User as PrismaUser } from '../../types/prismaTypes';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

type User = Omit<PrismaUser, 'password'>;

const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {} as any);

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  currentUser = signal<User | null>(null);
  jwt = signal<string | null>(null);

  constructor() {
    if (this.platformId === 'browser') {
      const jwt = this.cookieService.get('user-session');
      this.hydrateUser(jwt);
    } else {
      const req = inject(REQUEST);
      const cookieString = req?.headers?.get('cookie');
      if (cookieString) {
        const cookies = parseCookie(cookieString);
        const jwt = cookies['user-session'];
        this.hydrateUser(jwt);
      }
    }
  }

  private hydrateUser(jwt?: string) {
    if (jwt) {
      this.currentUser.set(jwtDecode(jwt));
      this.jwt.set(jwt);
    }
  }

  login(email: string, password: string, onSuccess?: () => void) {
    this.http
      .post<User>(
        'http://localhost:3000/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe(() => {
        const jwt = this.cookieService.get('user-session');
        this.hydrateUser(jwt);
        if (onSuccess) {
          onSuccess();
        }
      });
  }

  logout() {
    this.cookieService.delete('user-session');
    this.jwt.set(null);
    this.currentUser.set(null);
  }
}
