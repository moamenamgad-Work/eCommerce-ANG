import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input/input.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  flag: boolean = true;
  flag2: boolean = true;
  msgError: string = '';
  isloading: boolean = false;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
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
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d#@$!%*?&]{8,}$/
            ),
          ],
        ],
        rePassword: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitform(): void {
    if (this.registerForm.valid) {
      this.isloading = true;
      this.authService.registerForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.msgError = '';
            this.router.navigate(['./login']);
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
      this.registerForm.get('rePassword')?.patchValue('');
      this.registerForm.markAllAsTouched();
    }
  }
}
