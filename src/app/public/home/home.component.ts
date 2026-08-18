import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Talaba } from 'src/app/model/talaba';
import { FakultetService } from 'src/app/service/fakultet.service';
import { GuruhService } from 'src/app/service/guruh.service';
import { PublicService } from 'src/app/service/public.service';
import { YunalishService } from 'src/app/service/yunalish.service';
import { rasmManzili } from 'src/app/shared/rasm.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  talabalar: Talaba[] = [];
  key = '';
  fakultetlar: any[] = [];
  yunalishlar: any[] = [];
  guruhlar: any[] = [];

  length = 0;
  yuklanmoqda = true;
  readonly yil = new Date().getFullYear();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tanlanganFakultet: any = null;
  tanlanganYunalish: any = null;
  tanlanganGuruh: any = null;

  private qidiruvTaymer?: any;

  constructor(private publicService: PublicService,
    private fakultetService: FakultetService,
    private yunalishService: YunalishService,
    private guruhService: GuruhService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const hamma = { page: 0, size: 500, sort: 'nom' };
    this.fakultetService.getAll(hamma).subscribe(data => this.fakultetlar = data.content ?? []);
    this.yunalishService.getAll(hamma).subscribe(data => this.yunalishlar = data.content ?? []);
    this.guruhService.getAll(hamma).subscribe(data => this.guruhlar = data.content ?? []);
  }

  ngAfterViewInit(): void {
    this.load();
    this.cdr.detectChanges();
  }

  /** Tanlangan fakultetga tegishli yo'nalishlar (tanlanmagan bo'lsa hammasi) */
  get korinadiganYunalishlar(): any[] {
    if (!this.tanlanganFakultet) return this.yunalishlar;
    return this.yunalishlar.filter(y => y?.fakultet?.id === this.tanlanganFakultet.id);
  }

  /** Tanlangan yo'nalish/fakultetga tegishli guruhlar */
  get korinadiganGuruhlar(): any[] {
    if (this.tanlanganYunalish) return this.guruhlar.filter(g => g?.yunalish?.id === this.tanlanganYunalish.id);
    if (this.tanlanganFakultet) return this.guruhlar.filter(g => g?.yunalish?.fakultet?.id === this.tanlanganFakultet.id);
    return this.guruhlar;
  }

  get filtrBormi(): boolean {
    return !!(this.tanlanganFakultet || this.tanlanganYunalish || this.tanlanganGuruh || this.key);
  }

  load(): void {
    const params: any = {
      key: this.key ?? '',
      page: this.paginator?.pageIndex ?? 0,
      size: this.paginator?.pageSize ?? 12,
      sort: 'id,desc'
    };
    if (this.tanlanganGuruh) params.guruh = this.tanlanganGuruh.id;
    if (this.tanlanganFakultet) params.fakultet = this.tanlanganFakultet.id;
    if (this.tanlanganYunalish) params.yunalish = this.tanlanganYunalish.id;

    this.yuklanmoqda = true;
    this.publicService.getAll(params).subscribe({
      next: royxat => {
        this.talabalar = royxat.content ?? [];
        this.length = royxat.totalElements ?? 0;
        this.yuklanmoqda = false;
      },
      error: () => { this.talabalar = []; this.length = 0; this.yuklanmoqda = false; }
    });
  }

  /** Yozib bo'lgach 300 ms kutib qidiradi */
  qidir(): void {
    clearTimeout(this.qidiruvTaymer);
    this.qidiruvTaymer = setTimeout(() => this.birinchiSahifa(), 300);
  }

  fakultetTanlash(event: any): void {
    this.tanlanganFakultet = event.value;
    this.tanlanganYunalish = null;
    this.tanlanganGuruh = null;
    this.birinchiSahifa();
  }

  yunalishTanlash(event: any): void {
    this.tanlanganYunalish = event.value;
    this.tanlanganGuruh = null;
    this.birinchiSahifa();
  }

  guruhTanlash(event: any): void {
    this.tanlanganGuruh = event.value;
    this.birinchiSahifa();
  }

  tozalash(): void {
    this.tanlanganFakultet = null;
    this.tanlanganYunalish = null;
    this.tanlanganGuruh = null;
    this.key = '';
    this.birinchiSahifa();
  }

  private birinchiSahifa(): void {
    if (this.paginator) this.paginator.pageIndex = 0;
    this.load();
  }

  getRasm(file: any): string {
    return rasmManzili(file);
  }

  trackById(_: number, t: Talaba): number { return t.id; }
}
