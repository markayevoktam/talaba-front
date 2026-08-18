import { Component, Input, OnInit } from '@angular/core';
import { JwtUtil } from '../../core/jwtutil';

/**
 * Ochiq sayt uchun umumiy yuqori menyu.
 * Kirgan foydalanuvchiga "Admin panel", kirmaganga "Kirish" ko'rsatiladi.
 */
@Component({
  selector: 'app-pub-nav',
  templateUrl: './pub-nav.component.html',
  styleUrls: ['./pub-nav.component.scss']
})
export class PubNavComponent implements OnInit {
  /** Kichik ekranda ochiladigan menyu holati */
  ochiq = false;
  kirgan = false;

  readonly bandlar = [
    { nom: 'Bosh sahifa', yol: '/', ikon: 'home', exact: true },
    { nom: 'Bizning faxrimiz', yol: '/student', ikon: 'workspace_premium', exact: false },
    { nom: 'Iqtidorli talabalar', yol: '/talentd', ikon: 'star', exact: false },
  ];

  constructor(private jwtUtil: JwtUtil) { }

  ngOnInit(): void {
    this.kirgan = this.jwtUtil.tokenYaroqli();
  }

  yop(): void { this.ochiq = false; }
}
