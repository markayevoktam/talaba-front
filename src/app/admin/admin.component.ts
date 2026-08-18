import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';
import { User } from '../model/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  showFiller = false;
  user?: User;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(user => this.user = user);
  }

  chiqish(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }

}
