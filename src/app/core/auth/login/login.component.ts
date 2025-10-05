import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  subscription: Subscription = new Subscription();
  flag: boolean = true;
  msgError: string = '';
  isloading: boolean = false;

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  submitform(): void {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isloading = true;
      this.subscription = this.authService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.msgError = '';
              this.cookieService.set('token', res.token);
              this.authService.decodeToken();
              this.router.navigate(['./home']);
            }
            this.isloading = false;
          },
          error: (err) => {
            console.log(err);

            this.msgError = err.error.message;
            this.isloading = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
