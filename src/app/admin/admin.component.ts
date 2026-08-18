import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../core/account.service';
import { User } from '../model/user';

interface MenyuBand {
  nom: string;
  yol: string;
  ikon: string;
}

interface MenyuBolim {
  sarlavha: string;
  bandlar: MenyuBand[];
}

/** Admin panel menyusi — bo'limlarga ajratilgan */
export const ADMIN_MENYU: MenyuBolim[] = [
  {
    sarlavha: 'Asosiy',
    bandlar: [
      { nom: 'Bosh sahifa', yol: 'dashboard', ikon: 'dashboard' },
      { nom: 'Talabalar', yol: 'talaba', ikon: 'how_to_reg' },
      { nom: 'Studentlar', yol: 'student', ikon: 'school' },
    ]
  },
  {
    sarlavha: "Ma'lumotnomalar",
    bandlar: [
      { nom: 'Fakultetlar', yol: 'fakultet', ikon: 'account_balance' },
      { nom: "Yo'nalishlar", yol: 'yunalish', ikon: 'alt_route' },
      { nom: 'Guruhlar', yol: 'guruh', ikon: 'groups' },
      { nom: 'Loyihalar', yol: 'loyiha', ikon: 'lightbulb' },
      { nom: 'Yutuqlar', yol: 'yutuq', ikon: 'emoji_events' },
      { nom: 'Xarakterlar', yol: 'xarakter', ikon: 'psychology' },
    ]
  },
  {
    sarlavha: 'Tizim',
    bandlar: [
      { nom: 'Foydalanuvchilar', yol: 'user', ikon: 'manage_accounts' },
    ]
  }
];

const MOBIL_KENGLIK = 900;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user?: User;
  readonly menyu = ADMIN_MENYU;

  sidenavMode: 'side' | 'over' = 'side';
  sidenavOchiq = true;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(user => this.user = user);
    this.kenglikkaMoslash(window.innerWidth);
  }

  /** Avatar uchun ism-familiya bosh harflari (masalan "AA") */
  get boshHarflar(): string {
    if (!this.user) return '';
    const h = (s?: string) => (s && s.trim() ? s.trim()[0].toUpperCase() : '');
    return (h(this.user.ism) + h(this.user.familiya)) || h(this.user.login) || '?';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.kenglikkaMoslash((event.target as Window).innerWidth);
  }

  /** Kichik ekranda menyu ustma-ust ochiladi va standart yopiq turadi */
  private kenglikkaMoslash(kenglik: number): void {
    const mobil = kenglik < MOBIL_KENGLIK;
    this.sidenavMode = mobil ? 'over' : 'side';
    this.sidenavOchiq = !mobil;
  }

  /** Mobil rejimda band tanlangach menyuni yopish */
  mobilYop(): void {
    if (this.sidenavMode === 'over') {
      this.sidenavOchiq = false;
    }
  }

  chiqish(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
