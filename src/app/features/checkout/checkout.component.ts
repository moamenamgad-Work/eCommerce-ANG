import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@/app/shared/components/input/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';
import { routes } from '@/app/app.routes';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  checkOutForm!: FormGroup;
  id: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.getCardId();
  }

  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
      paymentMethod: [null, Validators.required],
    });
  }

  getCardId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        console.log(this.id);
      },
    });
  }

  setPayment(type: string): void {
    this.checkOutForm.patchValue({ paymentMethod: type });
  }

  submitForm(): void {
    if (this.checkOutForm.valid && this.id) {
      const payment = this.checkOutForm.value.paymentMethod;

      if (payment === 'visa') {
        this.toastrService.success(
          'Your order will be paid by Visa on delivery.'
        );

        this.cartService
          .CheckOutSessions(this.id, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res.status === 'success') {
                window.open(res.session.url, '_self');
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else if (payment === 'cash') {
        this.toastrService.success(
          'Your order will be paid by cash on delivery.'
        );
        this.cartService
          .CheckOutCash(this.id, this.checkOutForm.value)
          .subscribe({
            next: (res) => {
              if (res.status === 'success') {
                console.log(res.data);
                this.router.navigate(['/allorders']);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });

        console.log(this.checkOutForm.value);
      } else {
        this.toastrService.warning('Please select a payment method!');
      }
    } else {
      this.toastrService.error('Please fill the form correctly.');
    }
  }
}
