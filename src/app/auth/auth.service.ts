import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { User } from './user.model';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  expirationTimer: any = null;

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((res) =>
          this.authHandler(res.email, res.localId, res.idToken, +res.expiresIn)
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((res) =>
          this.authHandler(res.email, res.localId, res.idToken, +res.expiresIn)
        )
      );
  }

  autoLogin() {
    const currUser: {
      email: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('authUser'));

    if (!currUser) {
      return;
    }
    const loadedUser = new User(
      currUser.email,
      currUser.userId,
      currUser._token,
      new Date(currUser._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationTime =
        new Date(currUser._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationTime);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('authUser');

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
    // console.log(expirationDuration);
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMes = 'An unknown error occurred!';

    if (!error.error || !error.error.error) {
      return throwError(errorMes);
    } else {
      switch (error.error.error.message) {
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMes = 'User not found, Please check your credentials';
          break;
        case 'EMAIL_EXISTS':
          errorMes = 'This email already exists, Please Login';
      }
      return throwError(errorMes);
    }
  }

  private authHandler(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const newUser = new User(email, userId, token, expirationDate);

    this.user.next(newUser);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('authUser', JSON.stringify(newUser));
  }
}
