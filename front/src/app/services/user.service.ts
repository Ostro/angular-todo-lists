import { inject, Injectable, signal } from '@angular/core';
import { User as PrismaUser } from '../../types/prismaTypes';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

type User = Omit<PrismaUser, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router = inject(Router);
  currentUser = signal<User | null>(null);
  private http = inject(HttpClient);
  private document: Document = inject(DOCUMENT);
  localStorage: Storage | undefined;

  constructor() {
    this.localStorage = this.document.defaultView?.localStorage;
    const jwt = this.localStorage?.getItem('userSession');
    if (jwt) {
      this.currentUser.set(jwtDecode(jwt));
    }
  }

  login(email: string, password: string) {
    this.http
      .post<{ jwt: string }>('http://localhost:3000/login', {
        email,
        password,
      })
      .subscribe((data) => {
        this.localStorage?.setItem('userSession', data.jwt);
        this.currentUser.set(jwtDecode(data.jwt) as User);
        this.router.navigate(['/']);
      });
  }
}
