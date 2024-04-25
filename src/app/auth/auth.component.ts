import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private AuthService: AuthService, private router: Router) {}

  isLoginMode: boolean = true;
  isLoading: boolean = false;

  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;

    const email = f.value.email;
    const password = f.value.password;

    let authObs: Observable<AuthResponse>;

    if (this.isLoginMode) {
      authObs = this.AuthService.login(email, password);
    } else {
      authObs = this.AuthService.signup(email, password);
    }

    authObs.subscribe(
      (response) => {
        // console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMes) => {
        // console.log(errorMes);
        this.error = errorMes;
        this.isLoading = false;
      }
    );

    f.reset();
  }

  handleError() {
    this.error = null;
  }
}
