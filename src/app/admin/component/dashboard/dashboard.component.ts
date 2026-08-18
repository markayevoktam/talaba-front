import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from '../../../core/account.service';
import { Page } from '../../../model/page';
import { Talaba } from '../../../model/talaba';
import { User } from '../../../model/user';
import { FakultetService } from '../../../service/fakultet.service';
import { GuruhService } from '../../../service/guruh.service';
import { LoyihaService } from '../../../service/loyiha.service';
import { StudentService } from '../../../service/student.service';
import { TalabaService } from '../../../service/talaba.service';
import { UserService } from '../../../service/user.service';
import { YunalishService } from '../../../service/yunalish.service';
import { YutuqService } from '../../../service/yutuq.service';
import { rasmManzili } from '../../../shared/rasm.util';

/** Bosh sahifadagi bitta statistik karta */
export interface StatKarta {
  kalit: string;
  nom: string;
  ikon: string;
  yol: string;
  rang: string;       // ikon/aksent rangi
  fon: string;        // ikon orqasidagi och fon
  soni?: number;      // undefined — yuklanmoqda, null — xato
  xato?: boolean;
}

/** Tez amallar (yangi yozuv qo'shish sahifalari) */
export interface TezAmal {
  nom: string;
  ikon: string;
  yol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user?: User;
  bugun = new Date();

  kartalar: StatKarta[] = [
    { kalit: 'talaba',   nom: 'Talabalar',        ikon: 'how_to_reg',      yol: '/admin/talaba',   rang: '#2a78d6', fon: '#e3eefb' },
    { kalit: 'student',  nom: 'Studentlar',       ikon: 'school',          yol: '/admin/student',  rang: '#eb6834', fon: '#fdebe4' },
    { kalit: 'guruh',    nom: 'Guruhlar',         ikon: 'groups',          yol: '/admin/guruh',    rang: '#1baf7a', fon: '#e0f5ec' },
    { kalit: 'yunalish', nom: "Yo'nalishlar",     ikon: 'alt_route',       yol: '/admin/yunalish', rang: '#eda100', fon: '#fdf3dc' },
    { kalit: 'fakultet', nom: 'Fakultetlar',      ikon: 'account_balance', yol: '/admin/fakultet', rang: '#e87ba4', fon: '#fbe7ef' },
    { kalit: 'loyiha',   nom: 'Loyihalar',        ikon: 'lightbulb',       yol: '/admin/loyiha',   rang: '#008300', fon: '#e1f1e1' },
    { kalit: 'yutuq',    nom: 'Yutuqlar',         ikon: 'emoji_events',    yol: '/admin/yutuq',    rang: '#4a3aa7', fon: '#e9e6f6' },
    { kalit: 'user',     nom: 'Foydalanuvchilar', ikon: 'manage_accounts', yol: '/admin/user',     rang: '#e34948', fon: '#fbe4e4' },
  ];

  tezAmallar: TezAmal[] = [
    { nom: "Talaba qo'shish",    ikon: 'person_add',      yol: '/admin/talaba' },
    { nom: "Student qo'shish",   ikon: 'school',          yol: '/admin/student' },
    { nom: "Guruh qo'shish",     ikon: 'group_add',       yol: '/admin/guruh' },
    { nom: "Yo'nalish qo'shish", ikon: 'alt_route',       yol: '/admin/yunalish' },
    { nom: "Loyiha qo'shish",    ikon: 'lightbulb',       yol: '/admin/loyiha' },
    { nom: 'Foydalanuvchilar',   ikon: 'manage_accounts', yol: '/admin/user' },
  ];

  songgiTalabalar: Talaba[] = [];
  songgiYuklanmoqda = true;
  songgiXato = false;

  readonly rasm = rasmManzili;

  constructor(
    private accountService: AccountService,
    private talabaService: TalabaService,
    private studentService: StudentService,
    private guruhService: GuruhService,
    private yunalishService: YunalishService,
    private fakultetService: FakultetService,
    private loyihaService: LoyihaService,
    private yutuqService: YutuqService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(u => this.user = u);
    this.statistikaniYukla();
    this.songgiTalabalarniYukla();
  }

  /** Har bir bo'lim uchun umumiy sonni olish (faqat 1 ta element so'raladi, totalElements kifoya) */
  private statistikaniYukla(): void {
    const sahifaSoni = (p: Observable<Page>) => p.pipe(map(r => r?.totalElements ?? r?.content?.length ?? 0));
    const bittaSahifa = { page: 0, size: 1 };

    const manbalar: Record<string, Observable<number>> = {
      talaba:   sahifaSoni(this.talabaService.getAll(bittaSahifa)),
      student:  sahifaSoni(this.studentService.getAll(bittaSahifa)),
      guruh:    sahifaSoni(this.guruhService.getAll(bittaSahifa)),
      yunalish: sahifaSoni(this.yunalishService.getAll(bittaSahifa)),
      fakultet: sahifaSoni(this.fakultetService.getAll(bittaSahifa)),
      loyiha:   sahifaSoni(this.loyihaService.getAll(bittaSahifa)),
      yutuq:    sahifaSoni(this.yutuqService.getAll(bittaSahifa)),
      user:     this.userService.getAll('').pipe(map(r => Array.isArray(r) ? r.length : 0)),
    };

    for (const karta of this.kartalar) {
      const manba = manbalar[karta.kalit];
      if (!manba) continue;
      manba.pipe(catchError(() => of(null))).subscribe(soni => {
        if (soni === null) {
          karta.xato = true;
          karta.soni = 0;
        } else {
          karta.soni = soni;
        }
      });
    }
  }

  private songgiTalabalarniYukla(): void {
    this.talabaService.getAll({ page: 0, size: 6, sort: 'id,desc' })
      .pipe(catchError(() => { this.songgiXato = true; return of({ content: [] } as any as Page); }))
      .subscribe(page => {
        this.songgiTalabalar = page?.content ?? [];
        this.songgiYuklanmoqda = false;
      });
  }

  /** Salomlashuv — kun vaqtiga qarab */
  get salom(): string {
    const soat = this.bugun.getHours();
    if (soat < 6) return 'Xayrli tun';
    if (soat < 12) return 'Xayrli tong';
    if (soat < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  }

  trackByKalit(_: number, k: StatKarta): string { return k.kalit; }
  trackById(_: number, t: Talaba): number { return t.id; }
}
