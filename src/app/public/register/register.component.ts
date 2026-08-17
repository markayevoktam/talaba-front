import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  surovBajarilmoqda = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      ism: ['', Validators.required],
      familiya: ['', Validators.required],
      login: ['', Validators.required],
      parol: ['', [Validators.required, Validators.minLength(4)]],
      shartlar: [false, Validators.requiredTrue]
    });
  }

  royxatdanOtish() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { ism, familiya, login, parol } = this.registerForm.getRawValue();
    this.surovBajarilmoqda = true;

    this.accountService.register({ ism, familiya, login, parol }).subscribe({
      next: () => {
        this.surovBajarilmoqda = false;
        this.snackBar.open("Ro'yxatdan o'tdingiz, endi tizimga kiring", 'Ok', { duration: 4000 });
        this.router.navigate(['/login']);
      },
      error: () => this.surovBajarilmoqda = false
    });
  }

}
