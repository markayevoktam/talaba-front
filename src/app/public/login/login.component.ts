import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/core/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  surovBajarilmoqda = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [true]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.loginForm.getRawValue();
    this.surovBajarilmoqda = true;

    this.accountService.login({ username, password }, rememberMe).subscribe({
      next: () => {
        this.accountService.identity().subscribe({
          next: () => {
            this.surovBajarilmoqda = false;
            const redirect = this.activatedRoute.snapshot.queryParams['redirect'];
            this.router.navigateByUrl(redirect || '/admin');
          },
          error: () => this.surovBajarilmoqda = false
        });
      },
      error: () => this.surovBajarilmoqda = false
    })
  }

}
