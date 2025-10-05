import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input/input.component';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  step: number = 1;
  flag: boolean = true;
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  ngOnInit(): void {
    this.initform();
  }

  initform(): void {
    this.verifyEmail = this.fb.group({
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
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPassword = this.fb.group({
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
      newPassword: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d#@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.enterEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
      });
    }
  }
  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.enterCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          const code = this.verifyCode.value.resetCode.trim();
          console.log({ resetCode: code });
          this.step = 3;
        },
        error: (err) => {
          console.log(err);
          console.log(this.verifyCode.value);
          console.log(this.verifyCode.valid);
        },
      });
    }
  }
  formStep3(): void {
    if (this.resetPassword.valid) {
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
